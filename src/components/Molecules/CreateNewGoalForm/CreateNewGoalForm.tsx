import * as S from './CreateNewGoalFormStyles';
import { Label } from '../InputAndLabel/Label';
import { InputMF } from '../../atoms/InputMF/InputMF';

import { Trash } from '@phosphor-icons/react';
import { createGoalsData } from '../GoalTransactionModal/GoalTransactionModal';
import { ChangeEvent } from 'react';

interface CreateNewGoalFormProps {
   showCreateGoals: boolean;
   handleSubmit: (props: any) => any;
   createGaols: (data: createGoalsData) => Promise<unknown>;
   fields: any;
   remove: any;
   dataForUpdate: any;
   errors: any;
   handleChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
   addNewGoal: () => void;
}

export const CreateNewGoalForm = (props: CreateNewGoalFormProps) => {
   const {
      addNewGoal,
      createGaols,
      dataForUpdate,
      errors,
      fields,
      handleChange,
      handleSubmit,
      remove,
      showCreateGoals,
   } = props;

   return (
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
                                       dataForUpdate[index]?.expectated_expense
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
                                       dataForUpdate[index]?.expectated_revenue
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
                  <S.Button onClick={addNewGoal}>Adicionar</S.Button>
                  <S.Button type="submit">criar</S.Button>
               </S.WrapperButtons>
            </div>
         </>
      </S.Form>
   );
};
