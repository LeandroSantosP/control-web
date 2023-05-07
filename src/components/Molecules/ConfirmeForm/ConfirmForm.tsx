import { Check, X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { DataStorageProps } from '../../../pages/CreateProfile/CreateProfile';
import * as S from './ConfirmFormStyled';
import ImageDefault from '../../../img/Default.png';

const ConfirmForm = ({ data }: { data: DataStorageProps }) => {
   const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
   useEffect(() => {
      if (data.avatar !== '') {
         const file = URL.createObjectURL(data.avatar);
         setAvatarUrl(file);
      }
   }, [data.avatar]);

   return (
      <S.Wrapper>
         <S.InfoWrapper>
            <S.Info>
               <S.Title>Profissão</S.Title>
               <S.Description as="div">
                  {data.profession?.toString() || (
                     <p style={{ color: 'yellow' }}>Não especificado</p>
                  )}
                  {data['profession'] !== '' ? (
                     <Check color="green" size={20} />
                  ) : (
                     <X color="red" size={20} />
                  )}
               </S.Description>
            </S.Info>
            <S.Info>
               <S.Title>Telefone</S.Title>
               <S.Description as="div">
                  {data.phonenumber?.toString() || (
                     <p style={{ color: 'yellow' }}>Não especificado</p>
                  )}
                  {data['phonenumber'] !== '' ? (
                     <Check color="green" size={20} />
                  ) : (
                     <X color="red" size={20} />
                  )}
               </S.Description>
            </S.Info>
            <S.Info>
               <S.Title>Data de Nascimento</S.Title>
               <S.Description as="div">
                  {data.birthday?.toString() || (
                     <p style={{ color: 'yellow' }}>Não especificado</p>
                  )}
                  {data['birthday']?.toString() !== '' ? (
                     <Check color="green" size={20} />
                  ) : (
                     <X color="red" size={20} />
                  )}
               </S.Description>
            </S.Info>
            <S.Info>
               <S.Title>Salario</S.Title>
               <S.Description as="div">
                  {data.salary?.toString() || (
                     <p style={{ color: 'yellow' }}>Não especificado</p>
                  )}
                  {data['salary'] !== '' ? (
                     <Check color="green" size={20} />
                  ) : (
                     <X color="red" size={20} />
                  )}
               </S.Description>
            </S.Info>
         </S.InfoWrapper>
         <S.Img src={avatarUrl || ImageDefault} />
      </S.Wrapper>
   );
};

export { ConfirmForm };
