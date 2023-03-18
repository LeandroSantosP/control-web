import * as S from './DashBoard.Styled';
import logo from '../../shared/assets/logo.svg';
import { useAuth } from '../../shared/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../../shared/modules/Storage';

interface LayoutProps {
   children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
   const navigate = useNavigate();
   const { logout, isLogged } = useAuth();
   if (!isLogged) {
      navigate('/entrar');
   }

   return (
      <S.Wrapper>
         <S.Menu>
            <S.Logo src={logo} />
            <S.MenuContent>
               <S.WrapperOptions>
                  {Array.from({ length: 3 }).map((_, index) => {
                     return <h1 key={index}>item {index}</h1>;
                  })}
               </S.WrapperOptions>
               <button onClick={logout}>sair</button>
            </S.MenuContent>
         </S.Menu>
         <S.Main>{children}</S.Main>
      </S.Wrapper>
   );
};
