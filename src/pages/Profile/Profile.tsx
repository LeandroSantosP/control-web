import { z } from 'zod';
import { useState } from 'react';
import { toMoney } from 'vanilla-masker';
import { useForm } from 'react-hook-form';
import { Pencil } from '@phosphor-icons/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { ProfileStorage } from '../../shared/store/index';
import { Layout } from '../../components/providers/Layout';
import { Loading } from '../../components/atoms/Loading/Loading';
import { FormatCurense } from '../../shared/helpers/FormatCurense';
import { Input } from '../../components/atoms/InputCustomTwo/InputCustomTwo';
import { dataSchema } from '../../shared/helpers/UpdateCreateProfileZodSchema';
import ComputerIllustration from '../../shared/assets/ComputerIllustration.png';

import * as S from './ProfileStyles';
import { useFlashMessageContext } from '../../shared/contexts';
import { UpdatedProfilePic } from './UpdatedProfilePic';

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

type InputsType = { [key: string]: string };

const Profile = () => {
   const [formData, setFormData] = useState<InputsType>({});
   const { handleShowingFlashMessage } = useFlashMessageContext();
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
            Birthday: birthday === '' ? undefined : formattingData,
            phonenumber: phonenumber === '' ? undefined : phonenumber,
            profession,
            salary: formattingSalaryToDecimal,
         },
         avatar: undefined,
         isUpdate: true,
      })
         .then((response) => {
            if (response === undefined && !loading) {
               handleShowingFlashMessage({
                  message: 'Perfil atualizado com sucesso',
                  haveButton: false,
                  timer: 2000,
                  type: 'success',
               });
               setAbleToEdit(false);
               return;
            }
         })
         .catch((err) => {
            handleShowingFlashMessage({
               message: 'Algo deu errado na atualização!!',
               haveButton: false,
               timer: 2000,
               type: 'warning',
            });
            console.log({ err });
         });
   };

   const handleInputChange = (event: any) => {
      const { name, value } = event.target;
      if (name === 'salary') {
         const money = toMoney(value, {
            unit: 'R$',
         }) as string;
         return setFormData((prev) => ({ ...prev, [name]: money }));
      }

      setFormData({ ...formData, [name]: value });
   };

   const updatedImage = async (callback: () => File | undefined) => {
      const avatar = callback();
      if (avatar) {
         await CreateUpdateUserProfile({
            avatar,
            isUpdate: true,
            props: {},
         });
      }
      location.reload();
      return 'success';
   };

   return (
      <>
         <Loading loading={loading} />
         <Layout>
            <S.Header>
               <S.WrapperSection>
                  <UpdatedProfilePic
                     userAvatar={userProfile?.avatar}
                     handleSubmitPic={updatedImage}
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
                           value={
                              formData['profession'] ?? userProfile?.profession
                           }
                           onChange={handleInputChange}
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
                           value={
                              formData['phonenumber'] ??
                              userProfile?.phonenumber
                           }
                           onChange={handleInputChange}
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

                     {errors.phonenumber && (
                        <p>{errors.phonenumber?.message}</p>
                     )}
                  </S.InputWrapper>
                  <S.InputWrapper>
                     <S.Label>Data de Nascimento</S.Label>
                     {!ableToEdit ? (
                        <Input
                           {...register('birthday')}
                           type="date"
                           value={
                              formData['birthday'] ?? userProfile?.dateOfBirth
                           }
                           onChange={handleInputChange}
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
                           value={
                              formData['salary'] ??
                              toMoney(
                                 FormatCurense(
                                    Number(userProfile?.salary)
                                 ) as string,
                                 {
                                    unit: 'R$',
                                 }
                              )
                           }
                           {...register('salary', {
                              value: formData['salary'] ?? '',
                              onChange: handleInputChange,
                           })}
                           active={ableToEdit}
                           disabled={ableToEdit}
                        />
                     ) : (
                        <Input
                           active={ableToEdit}
                           disabled={ableToEdit}
                           value={toMoney(
                              FormatCurense(
                                 Number(userProfile?.salary)
                              ) as string,
                              {
                                 unit: 'R$',
                              }
                           )}
                        />
                     )}

                     {errors.salary && <p>{errors.salary.message}</p>}
                  </S.InputWrapper>
                  <S.SaveButton disabled={ableToEdit} active={ableToEdit}>
                     Salvar
                  </S.SaveButton>
               </S.Form>
               <S.ImageBackground src={ComputerIllustration} alt="" />
            </S.FormWrapper>
         </Layout>
      </>
   );
};

export default Profile;
