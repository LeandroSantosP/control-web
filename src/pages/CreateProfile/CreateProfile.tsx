import * as S from './CreateProfileStyles';

import { useEffect, useState } from 'react';
import { Layout } from '../../components/providers/Layout';
import { useFormHook } from '../../shared/hooks/useForm';
import { Checks, Image, Info } from '@phosphor-icons/react';
import RegisterForm from '../../components/Molecules/RegisterForm/RegisterForm';
import { ConfirmForm } from '../../components/Molecules/ConfirmeForm/ConfirmForm';
import { UploadAvatarForm } from '../../components/Molecules/UploadAvatar/UploadAvatar';

export type DataStorageProps = {
   profession: string;
   phonenumber: string;
   birthday: Date | undefined;
   salary: string;
   avatar: any;
   AllErrors:
      | {
           currentStep: number | undefined;
           haveError: boolean;
           message: string;
        }[]
      | undefined;
};

type DataStorageKeys = keyof DataStorageProps;

type ErrorType =
   | {
        currentStep: number | undefined;
        haveError: boolean;
        message: string;
     }[]
   | undefined;

export type UpdatedData = (
   key: DataStorageKeys,
   value: string | File | ErrorType
) => void;

const DataStorage = {
   profession: '',
   phonenumber: '',
   birthday: undefined,
   salary: '',
   avatar: '',
   AllErrors: undefined,
} as DataStorageProps;

export const CreateProfile = () => {
   const [data, setDate] = useState<DataStorageProps>(DataStorage);

   const [haveErros, setHaveErros] = useState<boolean>(false);

   const updatedData: UpdatedData = (
      key: string,
      value: string | File | ErrorType
   ) => {
      setDate((prev) => ({ ...prev, [key]: value }));
      // setDate((prev) => ({ ...prev, AllErrors: [...prev.AllErrors[0]] }));
      return;
   };

   const onValidate = async (callback: () => Promise<any> | undefined) => {
      await callback();
      return undefined;
   };

   const handleNext = () => {
      changeStep(currentStep + 1);
   };

   const steps = [
      <RegisterForm
         data={data}
         updateData={updatedData}
         onValidate={onValidate}
         key={1}
      />,
      <UploadAvatarForm
         haveErro={haveErros}
         data={data}
         updateData={updatedData}
         onValidate={onValidate}
         key={2}
      />,
      <ConfirmForm data={data} key={3} />,
   ];

   const { changeStep, currentStep, currentComponent, isLastStep } =
      useFormHook(steps);

   useEffect(() => {
      if (data.AllErrors !== undefined) {
         const stepOne = data.AllErrors.find((err) => err.currentStep === 0);

         if (stepOne?.haveError) {
            setHaveErros(true);
            return;
         }
      }
      if (data.AllErrors !== undefined) {
         const stepTwo = data.AllErrors.find((err) => err.currentStep === 1);

         if (
            (currentStep === 1 && stepTwo?.currentStep === 1,
            stepTwo?.haveError === true)
         ) {
            setHaveErros(true);
            return;
         }
      }
      setHaveErros(false);
   }, [currentStep, data.AllErrors]);

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
                           haveErro={haveErros}
                           onClick={() => changeStep(currentStep - 1)}
                           type="button"
                           disabled={haveErros}
                        >
                           Voltar
                        </S.Button>
                        <S.Button
                           haveErro={haveErros}
                           onClick={handleNext}
                           type={'button'}
                           disabled={haveErros}
                        >
                           Proximo
                        </S.Button>
                     </>
                  )}
                  {isLastStep && (
                     <>
                        <S.Button
                           haveErro={haveErros}
                           onClick={() => changeStep(currentStep - 1)}
                           type="button"
                        >
                           Voltar
                        </S.Button>
                        <S.Button
                           haveErro={haveErros}
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
