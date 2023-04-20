import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from 'react-router-dom';

import { DashBoard } from '../pages/DashBoard/DashBoard';
import { SingIn } from '../pages/SingIn/SingIn';
import { SingUp } from '../pages/SingUp/SingUp';
import { useFlashMessageContext } from '../shared/contexts/FlashMessageContext';
import { useAuthStorage } from '../shared/store/AuthContext/AuthContext';

const PrivateRoute = (Item: React.FC) => {
   const {
      state: { isLogged },
   } = useAuthStorage();

   return isLogged ? <Item /> : <SingIn />;
};

export function RoutesApp() {
   const { FlashMessage } = useFlashMessageContext();

   return (
      <>
         {FlashMessage}
         <Router>
            <Routes>
               <Route element={PrivateRoute(DashBoard)} path="/" />
               <Route element={<SingIn />} path="/entrar" />
               <Route element={<SingUp />} path="/cadastre" />
               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </Router>
      </>
   );
}
