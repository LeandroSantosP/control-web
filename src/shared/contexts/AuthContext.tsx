import { createContext, useContext, useState } from 'react';
import {
   getItem,
   setItem,
} from '../modules/Storage/persistence-adpeters/local-storage';
import { StorageProvider } from '../modules/Storage';
import { AxiosResponse } from 'axios';
import { AuthCredentials, loginAPI, SingUpAPI } from '../../api/index';

interface AuthContextProps {
   isLogged: boolean;
   login: (email: string, password: string) => Promise<UserResponse | void>;
   loading: boolean;
   logout: () => void;
   singUp: ({
      email,
      name,
      password,
   }: signUpProps) => Promise<void | AxiosResponse<any, any>>;

   error: { message: string } | undefined;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
   children: React.ReactNode;
}

export interface CredentialsProps {
   user: {
      name: string;
      email: string;
   };
   token: string;
}

export interface UserResponse {
   response?: {
      status: number;
      data: CredentialsProps;
   };
   status: number;
   data: CredentialsProps;
}

interface signUpProps {
   email: string;
   password: string;
   name: string;
}

export interface ErrosAxios {
   message: string;
}
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [error, setError] = useState<{ message: string }>();
   const [loading, setLoading] = useState(false);
   const [isLogged, setIsLogged] = useState(() => {
      const token = localStorage.getItem('auth');
      return token ? true : false;
   });

   function logout() {
      AuthCredentials('');
      localStorage.removeItem('auth');
      setIsLogged(false);
      return;
   }

   async function login(
      email: string,
      password: string
   ): Promise<UserResponse | void> {
      setIsLogged(false);
      setLoading(true);
      try {
         const response: UserResponse = await loginAPI({ email, password });

         if (response.status === 200) {
            setIsLogged(true);
            localStorage.setItem('auth', JSON.stringify(response.data));
         }

         return response;
      } catch (err: any) {
         setError(err.response.data);
         setIsLogged(false);
         return;
      } finally {
         setLoading(false);
      }
   }

   async function singUp({
      email,
      name,
      password,
   }: signUpProps): Promise<void | AxiosResponse<unknown>> {
      setLoading(true);

      try {
         const result = await SingUpAPI({ email, name, password });

         setError({ message: '' });
         return result;
      } catch (erro: any) {
         setError(erro.response?.data);
         return;
      } finally {
         setLoading(false);
      }
   }

   return (
      <AuthContext.Provider
         value={{ isLogged, logout, loading, login, singUp, error: error }}
      >
         <StorageProvider persistenceAdepter={{ getItem, setItem }}>
            {children}
         </StorageProvider>
      </AuthContext.Provider>
   );
};
