import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authStorage } from '../../../shared/store';
import { Loading } from '../../atoms/Loading/Loading';
import { Input } from '../../Molecules/Transaction/TransactionFormStyled';
import * as S from './ResetPassStyles';

interface ResetPassProps {
   cb(success: boolean): void;
}

const schema = z.object({
   pass: z.string().refine((pass) => {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass)) {
         return true;
      }
      return false;
   }, 'Senha deve conter no minemo 8 caracteres, e pelo menos uma letra e um numero!'),
   confirm_pass: z.string(),
});

type resetType = z.infer<typeof schema>;

interface ResetPassProps {
   cb(): void;
   token: string;
}

export const ResetPass = ({ cb, token }: ResetPassProps) => {
   const [valueOne, setValueOne] = useState('');
   const [valueTwo, setValueTwo] = useState('');
   const {
      actions: { resetPass },
      state: { isLogged },
   } = authStorage();
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      clearErrors,
   } = useForm<resetType>({
      resolver: zodResolver(schema),
   });

   useEffect(() => {
      if (valueOne !== valueTwo) {
         setError('confirm_pass', {
            type: 'igual',
            message: 'As senha persistam ser iguais',
         });
      } else {
         clearErrors('confirm_pass');
      }
   }, [clearErrors, setError, valueOne, valueTwo]);

   const onSubmit = (data: resetType) => {
      resetPass({ newPass: data.pass, token }).then(() => {
         cb();
      });
   };

   return (
      <>
         <Loading loading={isLogged} />
         <S.Wrapper>
            <S.SubWrapper>
               <h1>Reset de senha</h1>
               <span>Digite seu senha nova!</span>
            </S.SubWrapper>
            <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
               <label>Senha:</label>
               <Input
                  placeholder="Digite sua nova senha"
                  {...register('pass')}
                  onChange={({ target }) => setValueOne(target.value)}
               />
               <S.ErrorMessage>{errors.pass?.message}</S.ErrorMessage>
               <label>Confirme sua Senha:</label>
               <Input
                  placeholder="Confirme sua nova senha"
                  {...register('confirm_pass')}
                  onChange={({ target }) => setValueTwo(target.value)}
               />
               <S.ErrorMessage>{errors.confirm_pass?.message}</S.ErrorMessage>
               <S.Button>Enviar</S.Button>
            </S.FormWrapper>
         </S.Wrapper>
      </>
   );
};
