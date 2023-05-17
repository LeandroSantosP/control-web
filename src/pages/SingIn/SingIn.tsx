import { ErrorMessage } from '@hookform/error-message';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as S from './SingInStyles';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms/button/BaseButton';
import { Input } from '../../components/atoms/Input/InputBase';
import { Label } from '../../components/Molecules/InputAndLabel/Label';
import dollarBg from '../../shared/assets/5133.jpg';
import { useFlashMessageContext } from '../../shared/contexts';
import { authStorage } from '../../shared/store/AuthContext/AuthContext';

export interface Inputs {
   email: string;
   password: string;
}

export const SingIn = () => {
   const {
      actions,
      state: { isLogged, loading, errors: error },
   } = authStorage();
   const { handleShowingFlashMessage } = useFlashMessageContext();
   const navigation = useNavigate();

   useEffect(() => {
      if (isLogged) {
         navigation('/');
      }
   }, [isLogged, navigation]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>({
      mode: 'all',
   });

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const res = await actions.login(data.email, data.password);

      if (res?.status === 200) {
         handleShowingFlashMessage({
            message: 'Login efetuado com sucesso!',
            timer: 2000,
            type: 'success',
            haveButton: false,
         });
         navigation('/');

         return;
      }

      return res;
   };

   return (
      <S.Wrapper>
         <S.Box
            style={{
               backgroundImage: `url(${dollarBg})`,
               backgroundPosition: 'center center',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
            }}
         />

         <S.Box>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
               <h1>Bem-Vindo!</h1>

               <Label margin="1rem 0">Email</Label>
               <Input
                  placeholder="Ex:.example@example.com"
                  fontSize="medium"
                  register={{
                     ...register('email', {
                        required: 'Campo Obrigatório',
                        pattern: {
                           value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                           message: 'Email nao valido!',
                        },
                     }),
                  }}
               />

               {error === 'Email or password Is Incorrect!' && (
                  <S.ErrorMessage>Email ou senha inválidos!</S.ErrorMessage>
               )}
               <ErrorMessage
                  name="email"
                  errors={errors}
                  render={({ message }) => (
                     <S.ErrorMessage>{message}</S.ErrorMessage>
                  )}
               />

               <Label margin="1rem 0">Senha</Label>
               <Input
                  fontSize="medium"
                  type="password"
                  placeholder="Digite sua senha"
                  register={{
                     required: 'Campo Obrigatório',
                     ...register('password', {
                        required: 'Campo Obrigatório',
                     }),
                  }}
               />

               {error === 'Email or password Is Incorrect!' && (
                  <S.ErrorMessage>Email ou senha inválidos!</S.ErrorMessage>
               )}
               <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                     <S.ErrorMessage>{message}</S.ErrorMessage>
                  )}
               />

               <S.Box JustifyContent="space-between">
                  <Button fontSize="small" type="submit" ISdisabled={loading}>
                     {loading ? 'Carregando...' : 'Logar!'}
                  </Button>
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                     }}
                  >
                     <S.NotHaveAccount onClick={() => navigation('/cadastre')}>
                        Ainda não tem conta?
                     </S.NotHaveAccount>
                     <S.NotHaveAccount onClick={() => navigation('/resetpass')}>
                        Esqueceu a senha?
                     </S.NotHaveAccount>
                  </div>
               </S.Box>
            </S.Form>
         </S.Box>
      </S.Wrapper>
   );
};
