import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toMoney } from 'vanilla-masker';
import { z } from 'zod';
import { useTransactionContext } from '../../../shared/contexts';
import {
   categoryList,
   monthlyList,
   recurrencyList,
} from '../../../shared/helpers/CategoryMonthlyMocks';
import { Label } from '../InputAndLabel/Label';

import { SelectCustom } from '../Select/Select';
import * as S from './TransactionFormStyled';

function isFutureDate(date: string) {
   const currentDate = new Date();
   const inputDate = new Date(date);
   return inputDate > currentDate;
}

const TransactionFormSchema = z.object({
   value: z
      .string()
      .nonempty('Campo Obrigatório!')
      .refine((value) => {
         const numberFormatted = Number(
            (value = value.replace('R$ ', '')).replace(',', '.')
         );

         return numberFormatted !== 0;
      }, 'Valor Invalido!'),
   description: z.string().nonempty('Campo Obrigatório!'),
   date: z.string().refine((date) => {
      const res = isFutureDate(date);

      return res;
   }, 'Data invalida!'),
   installments: z.coerce
      .number()
      .optional()
      .refine((current) => {
         if ((current && current < 2) || (current && current > 12)) {
            return false;
         }
         return true;
      }, 'Deve conter entre 2 e 12 parcelas!'),
});

type TransactionFormSchema = z.infer<typeof TransactionFormSchema>;

export const Transaction = () => {
   const [value, setValue] = useState('');
   const {
      CreateMutation: { mutate, isLoading },
      open,
      setOpen,

      GetTransaction,
   } = useTransactionContext();

   const {
      register,
      handleSubmit,
      setValue: SetValueInstallments,
      reset,
      formState: { errors },
   } = useForm<TransactionFormSchema>({
      mode: 'all',
      resolver: zodResolver(TransactionFormSchema),
   });

   const [isSubscription, setIsSubscription] = useState<boolean>(false);
   const [transactionType, setTransactionType] = useState<string>('Receita');
   const [category, setCategory] = useState<string>('unknown');
   const [recurrency, setRecurrency] = useState<string>('null');

   useEffect(() => {
      SetValueInstallments('installments', 2);
      if (transactionType === 'Receita') {
         setIsSubscription(false);
         SetValueInstallments('installments', undefined);
      }
      if (recurrency == 'null') {
         setIsSubscription(false);
         SetValueInstallments('installments', undefined);
      }
      if (isSubscription) {
         SetValueInstallments('installments', undefined);
      }
   }, [SetValueInstallments, isSubscription, recurrency, transactionType]);

   const onSubmit = async (data: TransactionFormSchema) => {
      try {
         const numberFormatted = data.value.replace('R$ ', '');

         let convertedForDecimal = parseFloat(
            numberFormatted.replace(/\./g, '').replace(',', '.')
         )
            .toString()
            .trim();

         if (transactionType === 'Despesa') {
            convertedForDecimal = '-' + convertedForDecimal;
         }

         let dataFormatted = {
            date: data.date,
            description: data.description,
            value: convertedForDecimal,
            isSubscription,
            category,
            recurrency: recurrency === 'null' ? null : recurrency,
            transactionType,
         } as any;

         if (data.installments !== 0 && !isSubscription) {
            dataFormatted = {
               ...dataFormatted,
               installments: data.installments,
            };
         }

         mutate(dataFormatted);
         reset();
         setValue('');
         return;
      } catch (err) {
         return Promise.reject(err);
      } finally {
         GetTransaction({});
      }
   };

   const handleChange = (e: any) => {
      const valueFormatted = toMoney(e.target.value, {
         unit: 'R$',
      }) as string;

      setValue(valueFormatted);
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
                  <S.Form onSubmit={handleSubmit(onSubmit)}>
                     <S.DialogClose>
                        <X />
                     </S.DialogClose>
                     <S.Wrapper>
                        <S.Title>Cadastro de Transação</S.Title>
                        <div style={{ margin: '.5rem 0' }}>
                           <S.InputTransactionValue
                              color={transactionType}
                              value={value || 'R$ 0,00'}
                              {...register('value', {
                                 onChange: handleChange,
                              })}
                           />
                           {errors.value && (
                              <S.ErrorMessage>
                                 {errors.value.message}
                              </S.ErrorMessage>
                           )}
                        </div>

                        <S.SelectWrapper>
                           <S.SelectWrapperChildren>
                              <S.Label>Tipo</S.Label>
                              <SelectCustom
                                 setCurrentValue={setTransactionType}
                                 currentValue={transactionType}
                                 fieldList={monthlyList}
                              />
                           </S.SelectWrapperChildren>
                           <S.SelectWrapperChildren>
                              <S.Label>Categoria</S.Label>
                              <SelectCustom
                                 setCurrentValue={setCategory}
                                 currentValue={category}
                                 fieldList={categoryList}
                              />
                           </S.SelectWrapperChildren>

                           <S.SelectWrapperChildren>
                              <S.Label>Recorrência</S.Label>
                              <SelectCustom
                                 setCurrentValue={setRecurrency}
                                 currentValue={recurrency}
                                 fieldList={recurrencyList}
                              />
                           </S.SelectWrapperChildren>
                        </S.SelectWrapper>

                        <S.WrapperSwitchButton
                           disable={
                              transactionType === 'Receita'
                                 ? true
                                 : false || (recurrency === 'null' && true)
                           }
                        >
                           <S.WrapperChildrenSwitchButton>
                              <S.Label>E uma Inscrição?</S.Label>
                              <S.SwitchRoot
                                 checked={isSubscription}
                                 onCheckedChange={setIsSubscription}
                              >
                                 <S.SwitchThumb checked={isSubscription} />
                              </S.SwitchRoot>
                           </S.WrapperChildrenSwitchButton>

                           <S.WrapperChildrenSwitchButton alignItems="flex-end">
                              <S.Label>Numero de vezes!</S.Label>
                              <S.InstallmentsAmount
                                 disable={isSubscription}
                                 disabled={isSubscription}
                                 max="12"
                                 type="number"
                                 {...register('installments')}
                              />

                              {errors.installments && (
                                 <S.ErrorMessage>
                                    {errors.installments.message}
                                 </S.ErrorMessage>
                              )}
                           </S.WrapperChildrenSwitchButton>
                        </S.WrapperSwitchButton>

                        <Label
                           margin="0.5rem 20px"
                           color="#fff"
                           fontSize="small"
                        >
                           Descrição
                        </Label>

                        <S.Input {...register('description')} />
                        {errors.description && (
                           <S.ErrorMessage>
                              {errors.description.message}
                           </S.ErrorMessage>
                        )}
                        <Label
                           margin="0.5rem 20px"
                           color="#fff"
                           fontSize="small"
                        >
                           {transactionType === 'Despesa'
                              ? 'Data de vencimento'
                              : 'Data de Deposito'}
                        </Label>
                        <S.Input
                           placeholder="dd/mm/yyyy"
                           type="date"
                           {...register('date')}
                        />
                        {errors.date && (
                           <S.ErrorMessage>
                              {errors.date.message}
                           </S.ErrorMessage>
                        )}
                     </S.Wrapper>
                     <S.ButtonForm type="submit">Salvar</S.ButtonForm>
                  </S.Form>
               </S.DialogContent>
            </Dialog.Portal>
         </Dialog.Root>
      </>
   );
};
