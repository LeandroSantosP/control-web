import { z } from 'zod';
import { Trash } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import * as S from './DeleteGoalsFormStyles';
import { Label } from '../InputAndLabel/Label';
import { InputMF } from '../../atoms/InputMF/InputMF';
import { ValidMonths } from '../../../shared/myTypes/ValidMonths';
import { useGoalsStorage } from '../../../shared/store';
import { HandleDeleteAllGoals } from '../../../shared/helpers/DeleteAllGoals';
import { ForwardedRef, forwardRef } from 'react';

const DeleteGoalsSchema = z.object({
   goalsForDelete: z.array(
      z.object({
         months: z
            .string()
            .nonempty('Campo Obrigatório')
            .refine((month: any) => {
               if (ValidMonths[month] === undefined) {
                  return false;
               }

               return true;
            }, `Mes Invalido,Exe:..[02,03...12]`),
      })
   ),
});

export type deleteGoalsType = z.infer<typeof DeleteGoalsSchema>;

export const DeleteNewGoalForm = () => {
   const {
      actions: { remove: removeGoal },
   } = useGoalsStorage();
   const useFormProps = useForm<deleteGoalsType>({
      resolver: zodResolver(DeleteGoalsSchema),
      defaultValues: {
         goalsForDelete: [{ months: '00' }],
      },
   });

   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useFormProps;

   const { fields, append, remove } = useFieldArray({
      name: 'goalsForDelete',
      control,
   });

   async function DeleteGoals({ goalsForDelete }: any) {
      try {
         console.log(goalsForDelete);

         await removeGoal({ data: { data: { months: ['01'] } } });
      } catch (error) {
         console.log(goalsForDelete);
      }
   }

   function addMonths() {
      append({ months: '00' });
   }

   return (
      <FormProvider {...useFormProps}>
         <S.Form hide={true} onSubmit={handleSubmit(DeleteGoals)}>
            <>
               <div style={{ width: '100%' }}>
                  {fields.length > 1 && <S.MoreContentArrow />}
                  {fields.map((field, index: any) => {
                     const fieldNameMonth = `goalsForDelete.${index}.months`;

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
                                 Meses
                              </Label>
                              <InputMF name={fieldNameMonth} />

                              {errors?.goalsForDelete && (
                                 <S.ErrorMessage>
                                    {' '}
                                    {
                                       errors.goalsForDelete[index]?.months
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
                     <S.Button onClick={addMonths}>+</S.Button>
                     <S.Button type="submit">Remover</S.Button>
                  </S.WrapperButtons>
               </div>
            </>
         </S.Form>
      </FormProvider>
   );
};
