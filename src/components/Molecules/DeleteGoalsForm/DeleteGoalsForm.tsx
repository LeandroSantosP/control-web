import * as S from './DeleteGoalsFormStyles';
import { Label } from '../InputAndLabel/Label';
import { InputMF } from '../../atoms/InputMF/InputMF';

import { Trash } from '@phosphor-icons/react';
import { createGoalsData } from '../GoalTransactionModal/GoalTransactionModal';
import { ChangeEvent } from 'react';

interface CreateNewGoalFormProps {
   showDeleteGoals: boolean;
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
      showDeleteGoals,
   } = props;

   return (
      <S.Form hide={showDeleteGoals} onSubmit={handleSubmit(createGaols)}>
         <>
            <div style={{ width: '100%' }}>
               {fields.length > 1 && <S.MoreContentArrow />}
               {fields.map((field: any, index: any) => {
                  const fieldNameMonth = `dataForUpdate.${index}.monthFoDelete`;

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
                              onChange={(e) => handleChange(e, index)}
                              name={fieldNameMonth}
                              type={fieldNameMonth}
                           />

                           {dataForUpdate &&
                              errors?.dataForUpdate?.[index]?.monthFoDelete && (
                                 <S.ErrorMessage>
                                    {
                                       dataForUpdate[index]?.monthFoDelete
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
