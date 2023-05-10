import * as S from './CreateProfileStyles';

import { useEffect, useState } from 'react';
import { Layout } from '../../components/providers/Layout';
import { useFormHook } from '../../shared/hooks/useForm';
import { Checks, Image, Info } from '@phosphor-icons/react';
import RegisterForm from '../../components/Molecules/RegisterForm/RegisterForm';
import { ConfirmForm } from '../../components/Molecules/ConfirmeForm/ConfirmForm';
import { UploadAvatarForm } from '../../components/Molecules/UploadAvatar/UploadAvatar';
import { ProfileStorage } from '../../shared/store/index';
import { useFlashMessageContext } from '../../shared/contexts';
import { useNavigate } from 'react-router-dom';
import spinner from '../../shared/assets/spinner.svg';

export type DataStorageProps = {
   profession: string | undefined;
   phonenumber: string | undefined;
   birthday: Date | undefined;
   salary: string | undefined;
   avatar: File | undefined;
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
   profession: undefined,
   phonenumber: undefined,
   birthday: undefined,
   salary: undefined,
   avatar: undefined,
   AllErrors: undefined,
} as DataStorageProps;

export const CreateProfile = () => {
   const [data, setData] = useState<DataStorageProps>(DataStorage);
   const {
      actions,
      state: { loading },
   } = ProfileStorage();
   const { handleShowingFlashMessage } = useFlashMessageContext();
   const navigation = useNavigate();
   const [haveErros, setHaveErros] = useState<boolean>(false);

   const updatedData: UpdatedData = (
      key: string,
      value: string | File | ErrorType
   ) => {
      setData((prev) => {
         const dataUpdated = Object.assign<DataStorageProps, DataStorageProps>(
            {
               ...prev,
            },
            { ...prev, [key]: value }
         );

         return { ...dataUpdated };
      });

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

   const handleSubmit = (e: any) => {
      e.preventDefault();
      const { avatar, birthday, phonenumber, profession, salary } = data;
      const [year, month, day] = birthday?.toString().split('-') as string[];
      const formattingData = `${day}/${month}/${year}`;
      const formattingSalary = salary?.replace('R$', '').trim();
      let formattingSalaryToDecimal;

      if (formattingSalary) {
         formattingSalaryToDecimal = parseFloat(
            formattingSalary.replace(/\./g, '').replace(',', '.')
         ).toFixed(2);
      }

      actions
         .CreateUpdateUserProfile({
            props: {
               Birthday: formattingData,
               phonenumber,
               profession,
               salary: formattingSalaryToDecimal,
            },
            avatar,
            isUpdate: false,
         })
         .then((response) => {
            if (response === undefined) {
               handleShowingFlashMessage({
                  message: 'Perfil Criado com sucesso',
                  timer: 2000,
                  haveButton: false,
                  type: 'success',
               });

               navigation('/profile');
               return;
            }
         })
         .catch((err) => {
            console.log({ err });
         });
   };

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
      <>
         {loading && (
            <S.Loading>
               <img
                  src={spinner}
                  alt="Tres bolinhas no centro da tela indicando a carregamento da criação de perfil"
               />
            </S.Loading>
         )}
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
               <S.FormWrapper onSubmit={handleSubmit}>
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
      </>
   );
};
