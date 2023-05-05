import { Input } from '../../atoms/InputCustomTwo/InputCustomTwo';
import {
   DataStorageProps,
   UpdatedData,
} from '../../../pages/CreateProfile/CreateProfile';
import * as S from './RegisterFormStyles';

export const RegisterForm = ({
   data,
   updatedDate,
}: {
   data: DataStorageProps;
   updatedDate: UpdatedData;
}) => {
   return (
      <>
         <S.InputWrapper>
            <S.InputLabel>Profissão</S.InputLabel>
            <Input
               id="profession"
               onChange={({ target }) =>
                  updatedDate('profession', target.value)
               }
               value={data.profession}
               placeholder="Desenvolvedor Back-end"
               bg="rgba(243, 243, 243, 0.21)"
               cl="#c4c4c4f8"
               pc="#111"
               bx="2px -1px 9px 0px rgba(0, 0, 0, 0.149)"
            />
         </S.InputWrapper>
         <S.InputWrapper>
            <S.InputLabel>Salario</S.InputLabel>
            <Input
               onChange={({ target }) => updatedDate('salary', target.value)}
               value={data.salary}
               placeholder="R$ 2000"
               bg="rgba(243, 243, 243, 0.21)"
               cl="#c4c4c4f8"
               pc="#111"
               bx="2px -1px 9px 0px rgba(0, 0, 0, 0.149)"
            />
         </S.InputWrapper>
         <S.InputWrapper>
            <S.InputLabel>Telefone</S.InputLabel>
            <Input
               onChange={({ target }) =>
                  updatedDate('phonenumber', target.value)
               }
               value={data.phonenumber}
               placeholder="(11) 99999-9999"
               type="number"
               bg="rgba(243, 243, 243, 0.21)"
               cl="#c4c4c4f8"
               pc="#111"
               bx="2px -1px 9px 0px rgba(0, 0, 0, 0.149)"
            />
         </S.InputWrapper>
         <S.InputWrapper>
            <S.InputLabel>Data de aniversario</S.InputLabel>
            <Input
               onChange={({ target }) => updatedDate('birthday', target.value)}
               value={data.birthday}
               placeholder="21/05/2003"
               type="date"
               bg="rgba(243, 243, 243, 0.21)"
               cl="#c4c4c4f8"
               pc="#111"
               bx="2px -1px 9px 0px rgba(0, 0, 0, 0.149)"
            />
         </S.InputWrapper>
      </>
   );
};
