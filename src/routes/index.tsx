import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { SingIn } from '../pages/SingIn/SingIn';
import { SingUp } from '../pages/SingUp/SingUpBase';

export function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SingUp />} path="/cadastre" />
        <Route element={<SingIn />} path="/entrar" />
      </Routes>
    </Router>
  );
}
