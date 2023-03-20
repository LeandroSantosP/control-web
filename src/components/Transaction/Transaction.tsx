import * as Dialog from '@radix-ui/react-dialog';
import { PlusCircle, X } from '@phosphor-icons/react';
import { ErrorMessage } from '@hookform/error-message';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toMoney } from 'vanilla-masker';
import { useMutation } from 'react-query';

import { CreateTransaction } from '../../api';
import styles from './styled.module.css';
import { Button } from '../button/BaseButton';
import { Input } from '../Inputs/InputBase';
import { Label } from '../Inputs/Label';
import { Box } from '../Box/Box';
import { useState } from 'react';

import * as S from './TransactionFormStyled';

import { useFlashMessageContext } from '../../shared/contexts/FlashMessageContext';
import { useTransactionContext } from '../../shared/contexts';

interface Inputs {
   description: string;
   value: string;
   dueDate: string;
}

export const Transaction = () => {
   const { CreateMutation, open, setOpen } = useTransactionContext();
   const [value, setValue] = useState('');

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>({
      mode: 'all',
   });

   function isFutureDate(date: string) {
      const currentDate = new Date();
      const inputDate = new Date(date);
      return inputDate > currentDate;
   }

   const handleChange = (event: any) => {
      const newValue = toMoney(event.target.value, {
         unit: 'R$',
      }) as string;

      setValue(newValue);
   };

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         const numberFormatted = (data.value = data.value.replace('R$ ', ''));

         const convertedForDecimal = parseFloat(
            numberFormatted.replace(/\./g, '').replace(',', '.')
         )
            .toString()
            .trim();

         data.value = convertedForDecimal;

         CreateMutation.mutate(data);

         return;
      } catch (err) {
         return Promise.reject(err);
      }
   };

   return (
      <>
         <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className={styles.addTransaction} data-state>
               <PlusCircle />
            </Dialog.Trigger>
            <Dialog.Portal>
               <Dialog.Overlay className={styles.overlay} />
               <Dialog.Content className={styles.content}>
                  <Dialog.Close className={styles.closeButton}>
                     <X />
                  </Dialog.Close>
                  <S.Form onSubmit={handleSubmit(onSubmit)}>
                     <Box
                        flexDirection="column"
                        alignItems="flex-start"
                        JustifyContent="flex-start"
                     >
                        <S.Title>Cadastro de Transação</S.Title>
                        <Label
                           margin="0.5rem 20px"
                           color="#fff"
                           fontSize="medium"
                        >
                           Valor da despesa
                        </Label>
                        <Input
                           background_color_custom="#0000004b"
                           fontSize="medium"
                           placeholder="0,00"
                           value={value}
                           register={{
                              ...register('value', {
                                 required: 'Campo Obrigatório',
                                 onChange: handleChange,
                              }),
                           }}
                        />

                        <ErrorMessage
                           errors={errors}
                           name="value"
                           render={({ message }) => (
                              <S.ErrorMessage>{message}</S.ErrorMessage>
                           )}
                        />
                        <Label
                           margin="0.5rem 20px"
                           color="#fff"
                           fontSize="small"
                        >
                           Descrição
                        </Label>
                        <Input
                           background_color_custom="#0000004b"
                           fontSize="medium"
                           margin_bottom="1rem"
                           register={{
                              ...register('description', {
                                 required: 'Campo Obrigatório',
                              }),
                           }}
                        />
                        <ErrorMessage
                           errors={errors}
                           name="description"
                           render={({ message }) => (
                              <S.ErrorMessage>{message}</S.ErrorMessage>
                           )}
                        />
                        <Label
                           margin="0.5rem 20px"
                           color="#fff"
                           fontSize="small"
                        >
                           Data de vencimento
                        </Label>
                        <Input
                           placeholder="dd/mm/yyyy"
                           background_color_custom="#0000004b"
                           fontSize="medium"
                           type="date"
                           register={{
                              ...register('dueDate', {
                                 required: 'Campo Obrigatório',
                                 validate: {
                                    futureDate: (value) => isFutureDate(value),
                                 },
                              }),
                           }}
                        />
                        <ErrorMessage
                           errors={errors}
                           name="dueDate"
                           render={({ message }) => (
                              <S.ErrorMessage>{message}</S.ErrorMessage>
                           )}
                        />
                        {errors.dueDate?.type === 'futureDate' && (
                           <S.ErrorMessage>
                              Data Invalida, Deve ser uma Data Futura
                           </S.ErrorMessage>
                        )}
                     </Box>
                     <Button fontSize="medium" type="submit" ISdisabled={false}>
                        Salvar
                     </Button>
                  </S.Form>
               </Dialog.Content>
            </Dialog.Portal>
         </Dialog.Root>
      </>
   );
};
