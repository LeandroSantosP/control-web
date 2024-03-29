import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../shared/assets/logo.svg';
import { ProfileStorage } from '../../../shared/store';
import { authStorage } from '../../../shared/store/AuthContext/AuthContext';
import { Icon } from '../../atoms/Icons/Icon';
import * as S from './DashBoard.Styled';

interface LayoutProps {
   children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
   const navigate = useNavigate();
   const {
      actions,
      state: { isLogged },
   } = authStorage();
   const {
      actions: { reset },
   } = ProfileStorage();
   useEffect(() => {
      if (!isLogged) {
         navigate('/entrar');
         return;
      }
   }, [isLogged, navigate]);

   const handleClick = () => {
      actions.logout();
      reset();
      navigate('/entrar');
      return;
   };

   const handleProfile = () => {
      navigate('/profile');
   };

   const handleDashBoard = () => {
      navigate('/');
   };

   const listIcons = [
      <S.Dash onClick={handleDashBoard} key="1" fontSize="1.5rem" />,
      <S.User onClick={handleProfile} key="2" fontSize="1.5rem" />,
   ];

   return (
      <S.Wrapper>
         <S.Menu>
            <S.Logo src={logo} />
            <S.MenuContent>
               <S.WrapperOptions>
                  {listIcons.map((CustomIcon) => {
                     return (
                        <Icon key={CustomIcon.key} currentIcon={CustomIcon} />
                     );
                  })}
               </S.WrapperOptions>
               <S.Out fontSize="1.5rem" onClick={handleClick}>
                  sair
               </S.Out>
            </S.MenuContent>
         </S.Menu>
         <S.Main>{children}</S.Main>
      </S.Wrapper>
   );
};
