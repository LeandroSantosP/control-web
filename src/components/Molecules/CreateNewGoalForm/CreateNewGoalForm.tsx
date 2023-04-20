import { z } from 'zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useEffect } from 'react';
import { Trash } from '@phosphor-icons/react';
import VMasker, { toMoney } from 'vanilla-masker';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray } from 'react-hook-form';

import * as S from './CreateNewGoalFormStyles';
import { Label } from '../InputAndLabel/Label';
import { InputMF } from '../../atoms/InputMF/InputMF';
import { useGoalsStorage } from '../../../shared/store';
import { ValidMonths } from '../../../shared/myTypes/ValidMonths';

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
               }, `Mes Invalido,Exe:..[02,03...12]`),
            expectated_expense: z.string().nonempty('Campo Obrigatário'),

            expectated_revenue: z.string().nonempty('Campo Obrigatário'),
         })
      )
      .nonempty(),
});

export type createGoalsData = z.infer<typeof createGoalsSchema>;

interface CreateNewGoalFormProps {
   showCreateGoals: boolean;
}

export const CreateNewGoalForm = (props: CreateNewGoalFormProps) => {
   const {
      actions: { createOrUpdated, list },
   } = useGoalsStorage();
   const { showCreateGoals } = props;

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
      reset,
      control,
      setValue,
      formState: { errors },
   } = createGoalForm;

   const createGaols = async (data: createGoalsData) => {
      const result = data.dataForUpdate.map((data) => {
         const curren33tValue = {
            toDecimal: (value: string) => {
               return parseFloat(VMasker.toNumber(value)) / 100;
            },
            execute: (
               currentType: 'expectated_expense' | 'expectated_revenue'
            ) => {
               const value = data[currentType].replaceAll('R$', '');

               if (!value || isNaN(parseFloat(value))) {
                  console.error(
                     'This Value is invalid for Decimal Value!',
                     value
                  );
                  return;
               }

               let decimalValue = curren33tValue.toDecimal(value).toString();
               if (currentType === 'expectated_expense') {
                  decimalValue = '-' + decimalValue;
               }

               return decimalValue;
            },
         };

         const expectated_expense =
            curren33tValue.execute('expectated_expense');

         const expectated_revenue =
            curren33tValue.execute('expectated_revenue');

         return {
            month: data.month,
            expectated_expense,
            expectated_revenue,
         };
      });

      try {
         await createOrUpdated({
            createIfNotExist: true,
            dataForUpdate: result,
         });
         await list();
         reset();

         return;
      } catch (err) {
         if (err instanceof AxiosError) {
            console.error(err.response?.data.message);
         }
         reset();
         return err;
      }
   };

   const { dataForUpdate } = errors;

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'dataForUpdate',
   });

   useEffect(() => {
      if (fields.length === 0) {
         createGoalForm.resetField('dataForUpdate');
      }
   }, [createGoalForm, createGoalForm.resetField, fields]);

   const addNewGoal = () => {
      append({ expectated_expense: '', expectated_revenue: '', month: '' });
   };

   const handleChange = (
      event: ChangeEvent<HTMLInputElement>,
      index: number
   ) => {
      const { name, value } = event.target;

      const valueFormatted = toMoney(value, {
         unit: 'R$',
      }) as string;

      const currentInput = name.split('.').splice(-1)[0] as
         | 'expectated_revenue'
         | 'expectated_expense';

      if (['expectated_revenue'].includes(currentInput)) {
         setValue(`dataForUpdate.${index}.${currentInput}`, valueFormatted);
         return;
      }
      setValue(`dataForUpdate.${index}.${currentInput}`, valueFormatted);
      return;
   };

   return (
      <FormProvider {...createGoalForm}>
         <S.Form hide={showCreateGoals} onSubmit={handleSubmit(createGaols)}>
            <>
               <div style={{ width: '100%' }}>
                  {fields.length > 1 && <S.MoreContentArrow />}
                  {fields.map((field: any, index: any) => {
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

                              {dataForUpdate && dataForUpdate[index]?.month && (
                                 <S.ErrorMessage>
                                    {dataForUpdate[index]?.month?.message}
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
                                 Despesa Esperada
                              </Label>

                              <InputMF
                                 onChange={(e) => handleChange(e, index)}
                                 name={fieldNameExpense}
                                 type={fieldNameExpense}
                              />

                              {dataForUpdate &&
                                 errors?.dataForUpdate?.[index]
                                    ?.expectated_expense && (
                                    <S.ErrorMessage>
                                       {
                                          dataForUpdate[index]
                                             ?.expectated_expense?.message
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
                                 Receita Esperada
                              </Label>

                              <InputMF
                                 onChange={(e) => handleChange(e, index)}
                                 name={fieldNameRevenue}
                                 type={fieldNameRevenue}
                              />

                              {dataForUpdate &&
                                 dataForUpdate[index]?.expectated_revenue && (
                                    <S.ErrorMessage>
                                       {
                                          dataForUpdate[index]
                                             ?.expectated_revenue?.message
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
                     <S.Button onClick={addNewGoal}>Adicionar</S.Button>
                     <S.Button type="submit">criar</S.Button>
                  </S.WrapperButtons>
               </div>
            </>
         </S.Form>
      </FormProvider>
   );
};
