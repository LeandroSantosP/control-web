import { Check, X } from '@phosphor-icons/react';
import * as S from './ConfirmFormStyled';

const ConfirmForm = (data: any) => {
   return (
      <S.Wrapper>
         <S.InfoWrapper>
            <S.Info>
               <S.Title>Profissão</S.Title>
               <S.Description>
                  TESTANDO{' '}
                  {data['profession'] !== undefined ? (
                     <Check color="green" size={20} />
                  ) : (
                     <X color="red" size={20} />
                  )}
               </S.Description>
            </S.Info>
            <S.Info>
               <S.Title>Telefone</S.Title>
               <S.Description>
                  TESTANDO{' '}
                  {data['profession'] !== undefined ? (
                     <Check color="green" size={20} />
                  ) : (
                     <X color="red" size={20} />
                  )}
               </S.Description>
            </S.Info>
            <S.Info>
               <S.Title>Data de Nascimento</S.Title>
               <S.Description>
                  TESTANDO{' '}
                  {data['profession'] !== undefined ? (
                     <Check color="green" size={20} />
                  ) : (
                     <X color="red" size={20} />
                  )}
               </S.Description>
            </S.Info>
            <S.Info>
               <S.Title>Salario</S.Title>
               <S.Description>
                  TESTANDO{' '}
                  {data['profession'] !== undefined ? (
                     <Check color="green" size={20} />
                  ) : (
                     <X color="red" size={20} />
                  )}
               </S.Description>
            </S.Info>
         </S.InfoWrapper>
         <S.Img
            src={
               'https://img.vanguardvolleyball.com/does_img_academy_have_volleyball.jpg'
            }
         />
      </S.Wrapper>
   );
};

export { ConfirmForm };
