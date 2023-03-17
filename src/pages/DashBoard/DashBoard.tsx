import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/contexts/AuthContext';
import { useStorage } from '../../shared/modules/Storage';
import * as S from './DashBoard.Styled';

export const DashBoard = () => {
  const navigate = useNavigate();
  const { logout, isLogged } = useAuth();
  const { state } = useStorage();
  if (!isLogged) {
    navigate('/entrar');
  }

  return (
    <S.Wrapper>
      <S.Menu>
        <h1>Ola, {state && state.user?.name}</h1>
        <button onClick={logout}>sair</button>
      </S.Menu>
      <S.Main>
        <p>content</p>
      </S.Main>
    </S.Wrapper>
  );
};
