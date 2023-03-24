import * as Dialog from '@radix-ui/react-dialog';
import { PlusCircle, X } from '@phosphor-icons/react';
import { ErrorMessage } from '@hookform/error-message';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toMoney } from 'vanilla-masker';

import { Button } from '../../atoms/button/BaseButton';
import { Input } from '../../atoms/Input/InputBase';
import { Label } from '../InputAndLabel/Label';
import { Box } from '../../atoms/Box/Box';
import { useState } from 'react';
import { useTransactionContext } from '../../../shared/contexts';

import * as S from './TransactionFormStyled';
import { SelectCustom } from '../Select/Select';

interface Inputs {
   description: string;
   value: string;
   dueDate: string;
}

export const Transaction = () => {
   const {
      CreateMutation: { mutate, isLoading },
      open,
      setOpen,
   } = useTransactionContext();
   const [value, setValue] = useState('');

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<Inputs>({
      mode: 'all',
   });

   function isFutureDate(date: string) {
      const currentDate = new Date();
      const inputDate = new Date(date);
      return inputDate > currentDate;
   }
   const [transactionType, setTransactionType] = useState<string>('Receita');

   const monthlyList = [
      { value: 'Despesa', Name: 'Despesa' },
      { value: 'Receita', Name: 'Receita' },
   ];

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

         data.value =
            transactionType === 'Receita'
               ? convertedForDecimal
               : '-' + convertedForDecimal;

         mutate(data);
         reset();
         setValue('');
         return;
      } catch (err) {
         return Promise.reject(err);
      }
   };

   if (isLoading) {
      return <h1>Carregando</h1>;
   }
   return (
      <>
         <S.TitleTransaction>Transações</S.TitleTransaction>
         <Dialog.Root open={open} onOpenChange={setOpen}>
            <S.DialogTrigger>
               <PlusCircle />
            </S.DialogTrigger>
            <Dialog.Portal>
               <S.DialogOverlay />
               <S.DialogContent>
                  <S.DialogClose>
                     <X />
                  </S.DialogClose>
                  <S.Form onSubmit={handleSubmit(onSubmit)}>
                     <S.SelectWrapper>
                        <SelectCustom
                           setCurrentValue={setTransactionType}
                           currentValue={transactionType}
                           fieldList={monthlyList}
                        />
                     </S.SelectWrapper>
                     <Box
                        flexDirection="column"
                        alignItems="center"
                        width="100%"
                        height="100%"
                     >
                        <S.Title>Cadastro de Transação</S.Title>

                        <S.InputTransactionValue
                           color={transactionType}
                           value={value || 'R$ 0,00'}
                           {...register('value', {
                              required: 'Campo Obrigatório',
                              onChange: handleChange,
                           })}
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
                           margin_bottom="4rem"
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
                     <Button
                        fontSize="medium"
                        type="submit"
                        bg="transparent"
                        ISdisabled={isLoading}
                     >
                        Salvar
                     </Button>
                  </S.Form>
               </S.DialogContent>
            </Dialog.Portal>
         </Dialog.Root>
      </>
   );
};
