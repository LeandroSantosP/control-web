import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { DashBoard } from '../pages/DashBoard/DashBoard';
import { SingIn } from '../pages/SingIn/SingIn';
import { SingUp } from '../pages/SingUp/SingUp';
import { useAuth } from '../shared/contexts/AuthContext';

const PrivateRoute = (Item: React.FC) => {
  const { isLogged } = useAuth();

  return isLogged ? <Item /> : <SingIn />;
};

export function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route element={PrivateRoute(DashBoard)} path="/" />
        <Route element={<SingIn />} path="/entrar" />
        <Route element={<SingUp />} path="/cadastre" />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
