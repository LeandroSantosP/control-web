import * as S from './ProfileStyles';
import { z } from 'zod';
import { useState } from 'react';
import { Pencil } from '@phosphor-icons/react';
import { Input } from '../../components/atoms/InputCustomTwo/InputCustomTwo';
import ComputerIllustration from '../../shared/assets/ComputerIllustration.png';
import { Layout } from '../../components/providers/Layout';
import { ProfileStorage } from '../../shared/store/index';
import { useForm } from 'react-hook-form';
import { dataSchema } from '../../shared/helpers/UpdateCreateProfileZodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toMoney } from 'vanilla-masker';
import { FormatCurense } from '../../shared/helpers/FormatCurense';

export const dataSchemaWithOptionalBirthday = dataSchema
   .omit({ birthday: true })
   .merge(
      z.object({
         birthday: z
            .string()
            .optional()
            .refine((value: any) => {
               if (value === '') {
                  return true;
               }
               const dateOfBirth = new Date(value);
               const age = Math.floor(
                  (Number(new Date()) - Number(dateOfBirth)) /
                     (365.25 * 24 * 60 * 60 * 1000)
               );

               return age >= 16;
            }, 'Deve ser maior de 16 anos'),
      })
   );

type ProfileFormSchema = z.infer<typeof dataSchemaWithOptionalBirthday>;

const Profile = () => {
   const [salary, setSalary] = useState<string>('');
   const {
      state: { userProfile, loading },
      actions: { CreateUpdateUserProfile },
   } = ProfileStorage();
   const [ableToEdit, setAbleToEdit] = useState(true);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ProfileFormSchema>({
      mode: 'all',
      resolver: zodResolver(dataSchemaWithOptionalBirthday),
   });

   const onSubmit = (data: ProfileFormSchema) => {
      const { birthday, phonenumber, profession, salary } = data;
      const [year, month, day] = birthday?.toString().split('-') as string[];
      const formattingData = `${day}/${month}/${year}`;
      const formattingSalary = salary?.replace('R$', '').trim();
      let formattingSalaryToDecimal;

      if (formattingSalary) {
         formattingSalaryToDecimal = parseFloat(
            formattingSalary.replace(/\./g, '').replace(',', '.')
         ).toFixed(2);
      }

      CreateUpdateUserProfile({
         props: {
            Birthday: formattingData,
            phonenumber: phonenumber === '' ? undefined : phonenumber,
            profession,
            salary: formattingSalaryToDecimal,
         },
         avatar: undefined,
         isUpdate: true,
      })
         .then((response) => {
            if (response === undefined) {
               setAbleToEdit(false);
               return;
            }
         })
         .catch((err) => {
            console.log({ err });
         });
   };

   return (
      <Layout>
         <S.Header>
            <S.WrapperSection>
               <S.ProfilePic
                  src={userProfile?.avatar}
                  alt="Image do perfil do usuário."
               />
               <S.ProfileName>
                  Bem vindo! {userProfile?.user.name.toUpperCase()}
               </S.ProfileName>
            </S.WrapperSection>
         </S.Header>
         <S.FormWrapper>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
               <S.EditProfileButton
                  active={ableToEdit}
                  onClick={() => setAbleToEdit((prev) => !prev)}
                  type="button"
               >
                  <Pencil />
               </S.EditProfileButton>
               <S.InputWrapper>
                  <S.Label>Profissão</S.Label>
                  {!ableToEdit ? (
                     <Input
                        active={ableToEdit}
                        {...register('profession')}
                        disabled={ableToEdit}
                     />
                  ) : (
                     <Input
                        active={ableToEdit}
                        disabled={ableToEdit}
                        value={userProfile?.profession}
                     />
                  )}
                  {errors.profession && <p>{errors.phonenumber?.message}</p>}
                  <S.Label>Telefone</S.Label>
                  {!ableToEdit ? (
                     <Input
                        {...register('phonenumber')}
                        active={ableToEdit}
                        disabled={ableToEdit}
                     />
                  ) : (
                     <Input
                        active={ableToEdit}
                        disabled={ableToEdit}
                        value={userProfile?.phonenumber}
                     />
                  )}

                  {errors.phonenumber && <p>{errors.phonenumber?.message}</p>}
               </S.InputWrapper>
               <S.InputWrapper>
                  <S.Label>Data de Nascimento</S.Label>
                  {!ableToEdit ? (
                     <Input
                        {...register('birthday')}
                        type="date"
                        active={ableToEdit}
                        disabled={ableToEdit}
                     />
                  ) : (
                     <Input
                        active={ableToEdit}
                        disabled={ableToEdit}
                        value={userProfile?.dateOfBirth}
                     />
                  )}

                  {errors.birthday && <p>{errors.birthday.message}</p>}
                  <S.Label>Salario</S.Label>
                  {!ableToEdit ? (
                     <Input
                        value={salary}
                        {...register('salary', {
                           value: salary,
                           onChange: ({ target }) => {
                              const money = toMoney(target.value, {
                                 unit: 'R$',
                              }) as string;
                              setSalary(money);
                           },
                        })}
                        active={ableToEdit}
                        disabled={ableToEdit}
                     />
                  ) : (
                     <Input
                        active={ableToEdit}
                        disabled={ableToEdit}
                        value={toMoney(
                           FormatCurense(Number(userProfile?.salary)) as string,
                           {
                              unit: 'R$',
                           }
                        )}
                     />
                  )}

                  {errors.salary && <p>{errors.salary.message}</p>}
               </S.InputWrapper>
               <S.SaveButton active={ableToEdit}>Salvar</S.SaveButton>
            </S.Form>
            <S.ImageBackground src={ComputerIllustration} alt="" />
         </S.FormWrapper>
      </Layout>
   );
};

export default Profile;
