import * as S from './GoalTransactionModalStyles';
import { ChangeEvent } from 'react';
import { Target, Trash, X } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../InputAndLabel/Label';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';

import { z } from 'zod';
import { InputMF } from '../../atoms/InputMF/InputMF';
// import { ErrorMessageMF } from '../../atoms/ErrorMessageMF/ErrorMessageMF';
import { toMoney } from 'vanilla-masker';
import { useState } from 'react';

type ValidMonthsType = {
   [key: string]: string;
};

const ValidMonths: ValidMonthsType = {
   '01': 'Janeiro',
   '02': 'Fevereiro',
   '03': 'Março',
   '04': 'Abril',
   '05': 'Maio',
   '06': 'Junho',
   '07': 'Julho',
   '08': 'Agosto',
   '09': 'Setembro',
   '10': 'Outubro',
   '11': 'Novembro',
   '12': 'Dezembro',
};

const createGoalsSchema = z.object({
   dataForUpdate: z
      .array(
         z.object({
            month: z
               .string()
               .nonempty('Campo Obrigatório')
               .refine((month: any) => {
                  if (ValidMonths[month] === undefined) {
                     return false;
                  }

                  return true;
               }, `Mes Invalido, formatado Esperado`),
            expectated_expense: z.string().nonempty('Campo Obrigatário'),

            expectated_revenue: z.string().nonempty('Campo Obrigatário'),
         })
      )
      .nonempty(),
});

type createGoalsData = z.infer<typeof createGoalsSchema>;

export const GoalsTransactionModal = () => {
   const [valueExpense, setValueExpense] = useState('');
   const [valueRevenue, setValueRevenue] = useState('');
   //fieldNameExpense
   const createGoalForm = useForm<createGoalsData>({
      resolver: zodResolver(createGoalsSchema),
      defaultValues: {
         dataForUpdate: [
            { expectated_expense: '', expectated_revenue: '', month: '' },
         ],
      },
   });

   const {
      handleSubmit,
      formState: { errors },
      control,
   } = createGoalForm;

   const createGaols = (data: any) => {
      console.log(data);
   };
   const { dataForUpdate } = errors;

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'dataForUpdate',
   });

   const addNewGoal = () => {
      append({ expectated_expense: '', expectated_revenue: '', month: '' });
   };

   /* O gradino deve ser capaz de mostra todos os meses, e en cada mes dele ter a meta em gestão justamente com as metas atual, caso  */

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const valueFormatted = toMoney(e.target.value, {
         unit: 'R$',
      }) as string;

      const currentInput = e.target.name.split('.').splice(-1)[0];

      if (currentInput === 'expectated_revenue') {
         setValueRevenue(valueFormatted);
         return;
      }

      setValueExpense(valueFormatted);
   };

   return (
      <S.DialogRoot>
         <S.DialogTrigger>
            <Target />
         </S.DialogTrigger>
         <S.DialogPortal>
            <S.DialogOverlay />
            <S.DialogContent>
               <S.DialogTitle>Goals</S.DialogTitle>
               <S.DialogDescription as="div">
                  Make changes to your profile here. Click save when you re
                  done.
                  <FormProvider {...createGoalForm}>
                     <S.Form onSubmit={handleSubmit(createGaols)}>
                        <>
                           <div style={{ width: '100%' }}>
                              {fields.map((field, index) => {
                                 const fieldNameMonth = `dataForUpdate.${index}.month`;
                                 const fieldNameExpense = `dataForUpdate.${index}.expectated_expense`;
                                 const fieldNameRevenue = `dataForUpdate.${index}.expectated_revenue`;
                                 return (
                                    <S.WrapperMúltiplosFields key={field.id}>
                                       <S.LabelAndInputWrapper>
                                          <S.RemoveButton
                                             type="button"
                                             onClick={() => remove(index)}
                                          >
                                             <Trash />
                                          </S.RemoveButton>
                                          <Label
                                             fontWeight="700"
                                             margin="0"
                                             fontSize={'small'}
                                             color="#fff"
                                          >
                                             Mes
                                          </Label>
                                          <InputMF
                                             name={fieldNameMonth}
                                             type={fieldNameMonth}
                                          />

                                          {dataForUpdate &&
                                             dataForUpdate[index]?.month && (
                                                <S.ErrorMessage>
                                                   {
                                                      dataForUpdate[index]
                                                         ?.month?.message
                                                   }
                                                </S.ErrorMessage>
                                             )}
                                       </S.LabelAndInputWrapper>
                                       <S.LabelAndInputWrapper>
                                          <Label
                                             fontWeight="700"
                                             margin="0"
                                             fontSize={'small'}
                                             color="#fff"
                                          >
                                             Despesa esperada
                                          </Label>

                                          <InputMF
                                             value={valueExpense || 'R$ 00,00'}
                                             onChange={handleChange}
                                             name={fieldNameExpense}
                                             type={fieldNameExpense}
                                          />

                                          {dataForUpdate &&
                                             dataForUpdate[index]
                                                ?.expectated_expense && (
                                                <S.ErrorMessage>
                                                   {
                                                      dataForUpdate[index]
                                                         ?.expectated_expense
                                                         ?.message
                                                   }
                                                </S.ErrorMessage>
                                             )}
                                       </S.LabelAndInputWrapper>
                                       <S.LabelAndInputWrapper>
                                          <Label
                                             fontWeight="700"
                                             margin="0"
                                             fontSize={'small'}
                                             color="#fff"
                                          >
                                             Receita esperada
                                          </Label>

                                          <InputMF
                                             value={valueRevenue || 'R$ 00,00'}
                                             onChange={handleChange}
                                             name={fieldNameRevenue}
                                             type={fieldNameRevenue}
                                          />

                                          {dataForUpdate &&
                                             dataForUpdate[index]
                                                ?.expectated_revenue && (
                                                <S.ErrorMessage>
                                                   {
                                                      dataForUpdate[index]
                                                         ?.expectated_revenue
                                                         ?.message
                                                   }
                                                </S.ErrorMessage>
                                             )}
                                       </S.LabelAndInputWrapper>
                                    </S.WrapperMúltiplosFields>
                                 );
                              })}
                           </div>
                           <div>
                              <S.WrapperButtons>
                                 <Label
                                    fontWeight="700"
                                    margin="0"
                                    fontSize={'small'}
                                    color="#fff"
                                 >
                                    Metas
                                 </Label>
                                 <S.Button onClick={addNewGoal}>
                                    Adicionar
                                 </S.Button>
                                 <S.Button type="submit">criar</S.Button>
                              </S.WrapperButtons>
                           </div>
                        </>
                        {/* <div>
                        <Label
                           fontWeight="700"
                           margin="0"
                           fontSize={'small'}
                           color="#fff"
                        >
                           Mes
                        </Label>
                        <S.Input
                           width="70px"
                           type="number"
                           fontSize="2.1rem"
                           {...register('month')}
                        />
                        {month && <PopOverError message={month?.message} />}
                     </div>
                     <div>
                        <Label
                           fontWeight="700"
                           margin="0"
                           fontSize={'small'}
                           color="#fff"
                        >
                           Receita Esperada
                        </Label>
                        <S.Input
                           fontSize="1rem"
                           width="100%"
                           type="text"
                           {...register('revenueExpect')}
                        />
                        {revenueExpect && (
                           <PopOverError message={revenueExpect?.message} />
                        )}
                     </div>
                     <div>
                        <Label
                           fontWeight="700"
                           margin="0"
                           fontSize={'small'}
                           color="#fff"
                        >
                           Despesa Esperada
                        </Label>
                        <S.Input
                           fontSize="1rem"
                           width="100%"
                           type="text"
                           {...register('expenseExpect')}
                        />
                        {expenseExpect && (
                           <PopOverError message={expenseExpect?.message} />
                        )}
                     </div> */}
                     </S.Form>
                  </FormProvider>
               </S.DialogDescription>
               <S.GoalsGraphs height="82%">1</S.GoalsGraphs>
               <S.DialogClose asChild>
                  <button>
                     <X />
                  </button>
               </S.DialogClose>
            </S.DialogContent>
         </S.DialogPortal>
      </S.DialogRoot>
   );
};
