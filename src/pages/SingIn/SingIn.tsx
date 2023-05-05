import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import * as S from './SingInStyles';

import dollarBg from '../../shared/assets/5133.jpg';
import { Input } from '../../components/atoms/Input/InputBase';
import { Button } from '../../components/atoms/button/BaseButton';
import { Label } from '../../components/Molecules/InputAndLabel/Label';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

      if (res?.response?.status === 400) {
         console.log(error);
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
               <ErrorMessage
                  name="email"
                  errors={errors}
                  render={({ message }) => <p>{message}</p>}
               />

               <Label margin="1rem 0">Senha</Label>
               <Input
                  fontSize="medium"
                  placeholder="Digite sua senha"
                  register={{
                     required: 'Campo Obrigatório',
                     ...register('password', {
                        required: 'Campo Obrigatório',
                     }),
                  }}
               />
               <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <p>{message}</p>}
               />

               <p>{error?.message}</p>

               <S.Box JustifyContent="space-between">
                  <Button fontSize="small" type="submit" ISdisabled={loading}>
                     {loading ? 'Carregando...' : 'Logar!'}
                  </Button>
                  <S.NotHaveAccount onClick={() => navigation('/cadastre')}>
                     Ainda não tem conta?
                  </S.NotHaveAccount>
               </S.Box>
            </S.Form>
         </S.Box>
      </S.Wrapper>
   );
};
