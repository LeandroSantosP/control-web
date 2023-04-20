import { z } from 'zod';
import { Trash } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import * as S from './DeleteGoalsFormStyles';
import { Label } from '../InputAndLabel/Label';
import { InputMF } from '../../atoms/InputMF/InputMF';
import { ValidMonths } from '../../../shared/myTypes/ValidMonths';

const DeleteGoalsSchema = z.object({
   goalsForDelete: z.array(
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
      })
   ),
});

export type deleteGoalsType = z.infer<typeof DeleteGoalsSchema>;

export const DeleteNewGoalForm = () => {
   const useFormProps = useForm<deleteGoalsType>({
      resolver: zodResolver(DeleteGoalsSchema),
      defaultValues: {
         goalsForDelete: [{ month: '00' }],
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

   function DeleteGoals(data: any) {
      console.log(data);
   }

   function addMonths() {
      append({ month: '00' });
   }

   return (
      <FormProvider {...useFormProps}>
         <S.Form hide={true} onSubmit={handleSubmit(DeleteGoals)}>
            <>
               <div style={{ width: '100%' }}>
                  {fields.length > 1 && <S.MoreContentArrow />}
                  {fields.map((field, index: any) => {
                     const fieldNameMonth = `goalsForDelete.${index}.month`;

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
                                       errors.goalsForDelete[index]?.month
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
                     <S.Button onClick={addMonths}>Adicionar</S.Button>
                     <S.Button type="submit">criar</S.Button>
                  </S.WrapperButtons>
               </div>
            </>
         </S.Form>
      </FormProvider>
   );
};
