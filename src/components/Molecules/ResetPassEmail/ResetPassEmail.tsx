import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authStorage } from '../../../shared/store/AuthContext/AuthContext';
import { Loading } from '../../atoms/Loading/Loading';
import { Input } from '../../Molecules/Transaction/TransactionFormStyled';
import * as S from './ResetPassEmailStyles';

const schema = z.object({
   email: z.string().email('Digite um e-mail válido!'),
});

type resetType = z.infer<typeof schema>;

interface ResetPassEmailProps {
   cb(sucesso: boolean): void;
}

export const ResetPassEmail = ({ cb }: ResetPassEmailProps) => {
   const {
      actions: { sendMail },
      state: { isLogged },
   } = authStorage();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<resetType>({
      resolver: zodResolver(schema),
   });

   const onSubmit = (data: resetType) => {
      sendMail(data.email)
         .then((res: any) => {
            if (res) {
               cb(res);
               return;
            }
         })
         .catch(() => {
            cb(false);
         });
   };
   return (
      <S.Wrapper>
         <Loading loading={isLogged} />
         <S.SubWrapper>
            <h1>Recuperar Senha</h1>
            <span>envie um email para recuperar sua senha</span>
         </S.SubWrapper>
         <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <label>E-mail:</label>
            <Input placeholder="seu@emai.com" {...register('email')} />
            <S.ErrorMessage>{errors.email?.message}</S.ErrorMessage>
            <S.Button type="submit">Enviar</S.Button>
         </S.FormWrapper>
      </S.Wrapper>
   );
};
