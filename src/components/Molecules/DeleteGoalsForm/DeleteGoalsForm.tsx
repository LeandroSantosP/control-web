import { z } from 'zod';
import { Trash } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import * as S from './DeleteGoalsFormStyles';
import { Label } from '../InputAndLabel/Label';
import { InputMF } from '../../atoms/InputMF/InputMF';
import { ValidMonths } from '../../../shared/myTypes/ValidMonths';
import { GoalsStorage } from '../../../shared/store';

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
   } = GoalsStorage();
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
      setError,
   } = useFormProps;

   const { fields, append, remove } = useFieldArray({
      name: 'goalsForDelete',
      control,
   });

   async function DeleteGoals({ goalsForDelete }: deleteGoalsType) {
      try {
         const months = [];
         for (let i = 0; i < goalsForDelete.length; i++) {
            months.push(goalsForDelete[i].months);
         }

         const response = await removeGoal({
            data: { data: { months } },
         });
         console.log(response);
      } catch (error: any) {
         const messageError = error.response.data.message as string;

         const pattern = /^Month \[\d+(,\s*\d+)*\] Not Found$/;
         const monthNotFound = pattern.test(messageError);

         const getMonthNumberPattern = /\[(\d+(,\s*\d+)*)\]/;
         const match = messageError.match(getMonthNumberPattern);

         if (error.response.status === 404 && monthNotFound && match !== null) {
            const months = match[1].split(', ').map((i) => i);
            setError('goalsForDelete', {
               type: 'custom',
               message: `Meses nao cadastrado. [${months}]`,
            });
         }
      } finally {
         console.log('ok');
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
                                 <>
                                    <S.ErrorMessage>
                                       {
                                          errors.goalsForDelete[index]?.months
                                             ?.message
                                       }
                                    </S.ErrorMessage>
                                    <S.ErrorMessage>
                                       {errors.goalsForDelete.type ===
                                          'custom' &&
                                          errors.goalsForDelete.message}
                                    </S.ErrorMessage>
                                 </>
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
