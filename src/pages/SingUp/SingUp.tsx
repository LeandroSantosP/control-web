import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from 'react-router-dom';

import * as S from './SingUpStyles';

import dollarBg from '../../shared/assets/5133.jpg';
import { Input } from '../../components/atoms/Input/InputBase';
import { Button } from '../../components/atoms/button/BaseButton';
import { Label } from '../../components/Molecules/InputAndLabel/Label';
import { useEffect } from 'react';
import { authStorage } from '../../shared/store/AuthContext/AuthContext';

export interface Inputs {
   email: string;
   name: string;
   password: string;
}

export const SingUp = () => {
   const navigation = useNavigate();
   const {
      actions,
      state: { isLogged, loading, errors: errorsApi },
   } = authStorage();

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
      const response = await actions.singUp({
         email: data.email,
         name: data.name,
         password: data.password,
      });

      if (response) {
         console.log('conta criada com sucesso!');
         navigation('/entrar');
      }
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
               <h1>Cadastre-se!</h1>
               <Label margin="1rem 0">Nome</Label>
               <Input
                  placeholder="Digite seu nome"
                  fontSize="medium"
                  register={{
                     ...register('name', {
                        required: 'Campo Obrigatório',
                     }),
                  }}
               />

               <p>{errors.name?.message && errors.name.message}</p>
               <Label margin="1rem 0">Email</Label>
               <Input
                  fontSize="medium"
                  placeholder="Ex:.example@example.com"
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
               <p>{errors.email?.message && errors.email.message}</p>
               <p>
                  {errorsApi?.message === 'Email already Exists!' &&
                     errorsApi?.message}
               </p>

               <Label margin="1rem 0">Senha</Label>
               <Input
                  fontSize="medium"
                  placeholder="Digite sua senha"
                  type="password"
                  register={{
                     required: 'Campo Obrigatório',
                     ...register('password', {
                        required: 'Campo Obrigatório',
                        pattern: {
                           value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                           message:
                              'Senha deve conter no minemo 8 caracteres, e pelo menos uma letra e um numero!',
                        },
                        minLength: {
                           value: 3,
                           message: 'Mínimo de 3 caracteres',
                        },
                     }),
                  }}
               />
               <p>{errors.password?.message && errors.password.message}</p>
               <S.Box JustifyContent="space-between">
                  <Button ISdisabled={loading} fontSize="small" type="submit">
                     {loading ? 'Carregando...' : ' Cadastra-se!'}
                  </Button>
                  <S.NotHaveAccount onClick={() => navigation('/entrar')}>
                     Já tem conta?
                  </S.NotHaveAccount>
               </S.Box>
            </S.Form>
         </S.Box>
      </S.Wrapper>
   );
};
