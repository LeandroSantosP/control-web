import * as S from './CreateProfileStyles';
import { useState } from 'react';
import { Layout } from '../../components/providers/Layout';
import { useForm } from '../../shared/hooks/useForm';
import { RegisterForm } from '../../components/Molecules/RegisterForm/RegisterForm';
import { UploadAvatarForm } from '../../components/Molecules/UploadAvatar/UploadAvatar';
import { ConfirmForm } from '../../components/Molecules/ConfirmeForm/ConfirmForm';
import { Checks, Image, Info } from '@phosphor-icons/react';

export type DataStorageProps = {
   profession: string;
   phonenumber: string;
   birthday: string;
   salary: string;
   avatar: any;
};
export type UpdatedData = (key: string, value: string | File) => void;

const DataStorage = {
   profession: '',
   phonenumber: '',
   birthday: '',
   salary: '',
   avatar: '',
} satisfies DataStorageProps;

export const CreateProfile = () => {
   const [data, setDate] = useState(DataStorage);

   const updatedData: UpdatedData = (key: string, value: string | File) => {
      setDate((prev) => ({ ...prev, [key]: value }));

      return;
   };

   const steps = [
      <RegisterForm data={data} updatedDate={updatedData} key={1} />,
      <UploadAvatarForm data={data} updatedDate={updatedData} key={2} />,
      <ConfirmForm key={2} />,
   ];

   const { changeStep, currentStep, currentComponent, isLastStep } =
      useForm(steps);

   return (
      <Layout>
         <S.Header>
            <S.Title>Criação de perfil.</S.Title>
            <S.Info>Voce ainda nao tem um perfil Crie um.</S.Info>
         </S.Header>
         <S.Wrapper>
            <S.StepsWrapper>
               <S.Line />
               <S.IconWrapper IconActive={currentStep === 0}>
                  <Info />
               </S.IconWrapper>

               <S.IconWrapper IconActive={currentStep === 1}>
                  <Image />
               </S.IconWrapper>
               <S.IconWrapper IconActive={currentStep === 2}>
                  <Checks />
               </S.IconWrapper>
            </S.StepsWrapper>
            <S.FormWrapper>
               {currentComponent}
               <S.WrapperButton>
                  {!isLastStep && (
                     <>
                        <S.Button
                           onClick={() => changeStep(currentStep - 1)}
                           type="button"
                        >
                           Voltar
                        </S.Button>
                        <S.Button
                           onClick={() => changeStep(currentStep + 1)}
                           type={'button'}
                        >
                           Proximo
                        </S.Button>
                     </>
                  )}
                  {isLastStep && (
                     <>
                        <S.Button
                           onClick={() => changeStep(currentStep - 1)}
                           type="button"
                        >
                           Voltar
                        </S.Button>
                        <S.Button
                           onClick={() => changeStep(currentStep + 1)}
                           type="submit"
                        >
                           Enviar
                        </S.Button>
                     </>
                  )}
               </S.WrapperButton>
            </S.FormWrapper>
         </S.Wrapper>
      </Layout>
   );
};
