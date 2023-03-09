import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import * as S from './SingInStyles';

import dollarBg from '../../assets/5133.jpg';
import { Input } from '../../components/Inputs/InputBase';
import { Button } from '../../components/button/BaseButton';
import { Label } from '../../components/Inputs/Label';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export interface Inputs {
  email: string;
  password: string;
}

export const SingIn = () => {
  const navigation = useNavigate();
  const { login, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await login(data.email, data.password);

    if (res.status === 200) {
      navigation('/');
    }

    if (res.response?.status === 400) {
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

          <Label>Email</Label>
          <Input
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
            errors={errors}
            name="email"
            render={({ message }) => <p>{message}</p>}
          />

          <Label>Senha</Label>
          <Input
            fontSize="medium"
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
            <Button fontSize="small" type="submit">
              Logar!
            </Button>
            <S.NotHaveAccount onClick={() => navigation('/cadastre')}>
              Ainda nao tem conta?
            </S.NotHaveAccount>
          </S.Box>
        </S.Form>
      </S.Box>
    </S.Wrapper>
  );
};
