import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
   useNavigate,
} from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { CreateProfile } from '../pages/CreateProfile/CreateProfile';

import { DashBoard } from '../pages/DashBoard/DashBoard';
import Profile from '../pages/Profile/Profile';
import { SingIn } from '../pages/SingIn/SingIn';
import { SingUp } from '../pages/SingUp/SingUp';
import { useFlashMessageContext } from '../shared/contexts/FlashMessageContext';
import { ProfileStorage } from '../shared/store';
import { authStorage } from '../shared/store/AuthContext/AuthContext';

function PrivateRoute(Page: () => JSX.Element) {
   const {
      state: { isLogged },
   } = authStorage();

   return isLogged ? <Page /> : <Navigate to="/entrar" />;
}

function RedirectOnLogin() {
   const navigation = useNavigate();
   const {
      state: { isLogged },
   } = authStorage();

   useEffect(() => {
      if (isLogged) {
         navigation('/');

         return;
      }
   }, [isLogged, navigation]);

   return null;
}

function GetProfileInfos(Profile: () => JSX.Element): any {
   const {
      state: { userProfile },
      actions: { GetProfile },
   } = ProfileStorage();

   const GetProfileRequest = useCallback(async () => {
      try {
         await GetProfile();
      } catch (error: any) {
         console.log({ error });
      }
   }, [GetProfile]);

   useEffect(() => {
      GetProfileRequest();
   }, [GetProfileRequest]);

   if (!userProfile) {
      return <CreateProfile />;
   }
   return <Profile />;
}

export function RoutesApp() {
   const { FlashMessage } = useFlashMessageContext();

   return (
      <>
         {FlashMessage}
         <Router>
            <Routes>
               <Route element={<RedirectOnLogin />} />
               <Route element={PrivateRoute(DashBoard)} path="/" />
               <Route element={GetProfileInfos(Profile)} path="/profile" />
               <Route element={<SingIn />} path="/entrar" />
               <Route element={<SingUp />} path="/cadastre" />
               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </Router>
      </>
   );
}
