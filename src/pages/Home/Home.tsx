import { useAuth } from '../../contexts/AuthContext';

export const Home = () => {
  const { user } = useAuth();
  console.log(user);

  return <div>Home</div>;
};
