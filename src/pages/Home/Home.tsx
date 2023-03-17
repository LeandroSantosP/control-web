import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/contexts/AuthContext';

export const Home = () => {
  const navigate = useNavigate();
  const { logout, isLogged } = useAuth();

  if (!isLogged) {
    navigate('/entrar');
  }
  return (
    <div>
      <h1>home</h1>
      <button onClick={logout}>sair</button>
    </div>
  );
};
