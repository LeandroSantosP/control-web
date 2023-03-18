import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Box } from '../../components/Box/Box';

import * as S from './SingInStyles';

import dollarBg from '../../shared/assets/5133.jpg';
import { Input } from '../../components/Inputs/InputBase';
import { Button } from '../../components/button/BaseButton';
import { Label } from '../../components/Inputs/Label';
import { useAuth } from '../../shared/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export interface Inputs {
   email: string;
   password: string;
}

export const SingIn = () => {
   const navigation = useNavigate();
   const { login, error, loading, isLogged } = useAuth();

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
      const res = await login(data.email, data.password);

      if (res?.status === 200) {
         navigation('/');
      }

      if (res?.response?.status === 400) {
         console.log(error);
      }
      return res;
   };

   return (
      <S.Wrapper>
         <Box
            style={{
               backgroundImage: `url(${dollarBg})`,
               backgroundPosition: 'center center',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
            }}
         />

         <Box>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
               <h1>Bem-Vindo!</h1>

               <Label>Email</Label>
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

               <Label>Senha</Label>
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

               <Box JustifyContent="space-between">
                  <Button fontSize="small" type="submit" ISdisabled={loading}>
                     {loading ? 'Carregando...' : 'Logar!'}
                  </Button>
                  <S.NotHaveAccount onClick={() => navigation('/cadastre')}>
                     Ainda não tem conta?
                  </S.NotHaveAccount>
               </Box>
            </S.Form>
         </Box>
      </S.Wrapper>
   );
};
