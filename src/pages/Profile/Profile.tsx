import * as S from './ProfileStyles';
import { useState } from 'react';
import { Pencil } from '@phosphor-icons/react';
import { Input } from '../../components/atoms/InputCustomTwo/InputCustomTwo';

import { Layout } from '../../components/providers/Layout';
import { ProfileStorage } from '../../shared/store/index';
import { Divider } from '../../components/atoms/Divider/Divider';

const Profile = () => {
   const {
      state: { userProfile },
   } = ProfileStorage();
   const [ableToEdit, setAbleToEdit] = useState(true);

   // useEffect(() => {
   //    actions.CreateUserProfile({
   //       props: {
   //          Birthday: '20/07/2005',
   //          phonenumber: '(11) 99999-9999',
   //          profession: 'dev',
   //          salary: '5000',
   //       },
   //       avatar: 'leandro',
   //    });
   //    console.log(state.error);
   // }, []);
   return (
      <Layout>
         <>
            <S.Header>
               <S.WrapperSection>
                  <S.ProfilePic
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU"
                     alt=""
                  />
                  <S.ProfileName>Bem vindo! Leandro</S.ProfileName>
               </S.WrapperSection>
            </S.Header>
            <S.FormWrapper>
               <S.Form>
                  <S.EditProfileButton
                     active={ableToEdit}
                     onClick={() => setAbleToEdit((prev) => !prev)}
                     type="button"
                  >
                     <Pencil />
                  </S.EditProfileButton>
                  <S.InputWrapper>
                     <S.Label>Nome</S.Label>
                     <Input active={ableToEdit} disabled={ableToEdit} />
                     <S.Label>Telefone</S.Label>
                     <Input active={ableToEdit} disabled={ableToEdit} />
                  </S.InputWrapper>
                  <Divider
                     height="1px"
                     width="600px"
                     bg="#111"
                     style={{ alignSelf: 'flex-start' }}
                  />
                  <S.InputWrapper>
                     <S.Label>Data de Nascimento</S.Label>
                     <Input active={ableToEdit} disabled={ableToEdit} />
                     <S.Label>Salario</S.Label>
                     <Input active={ableToEdit} disabled={ableToEdit} />
                  </S.InputWrapper>
                  <button>Salvar</button>
               </S.Form>
            </S.FormWrapper>
         </>
      </Layout>
   );
};

export default Profile;
