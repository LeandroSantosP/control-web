import * as S from './DashBoard.Styled';
import logo from '../../../shared/assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../atoms/Icons/Icon';
import { authStorage } from '../../../shared/store/AuthContext/AuthContext';

interface LayoutProps {
   children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
   const navigate = useNavigate();
   const {
      actions,
      state: { isLogged },
   } = authStorage();
   if (!isLogged) {
      navigate('/entrar');
   }

   const listIcons = [
      <S.Dash key="1" fontSize="1.5rem" />,
      <S.Graph key="2" fontSize="1.5rem" />,
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
               <S.Out fontSize="1.5rem" onClick={actions.logout}>
                  sair
               </S.Out>
            </S.MenuContent>
         </S.Menu>
         <S.Main>{children}</S.Main>
      </S.Wrapper>
   );
};
