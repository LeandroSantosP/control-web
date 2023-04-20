import { AxiosResponse } from 'axios';
import { create, SetState } from 'zustand';
import { AuthCredentials, loginAPI, SingUpAPI } from '../../../api/index';

const isLoggedInitialValue = () => {
   const token = localStorage.getItem('auth');
   return token ? true : false;
};

interface singUpProps {
   email: string;
   password: string;
   name: string;
}

interface useAuthStorageProps {
   state: {
      errors: any;
      isLogged: boolean;
      loading: boolean;
   };
   actions: {
      login: (email: string, password: string) => Promise<UserResponse | void>;
      logout: () => void;
      singUp: (props: singUpProps) => any;
      getToken: () => any;
   };
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

const updateAuthState =
   (set: SetState<useAuthStorageProps>) =>
   (newState: Partial<useAuthStorageProps['state']>) => {
      set((storage) => ({
         ...storage,
         state: {
            ...storage.state,
            ...newState,
         },
      }));
   };

export const useAuthStorage = create<useAuthStorageProps>((set) => ({
   state: {
      errors: '',
      isLogged: isLoggedInitialValue(),
      loading: false,
      token: '',
   },
   actions: {
      login: async (email, password): Promise<UserResponse | void> => {
         try {
            const response: UserResponse = await loginAPI({ email, password });

            if (response.status === 200) {
               updateAuthState(set)({ isLogged: true });
               localStorage.setItem('auth', JSON.stringify(response.data));
               AuthCredentials(response.data.token);
            }
            return response;
         } catch (error: any) {
            updateAuthState(set)({ isLogged: false, errors: '' });
            return;
         } finally {
            updateAuthState(set)({ isLogged: false, errors: '' });
         }
      },
      logout: () => {
         AuthCredentials('');
         localStorage.removeItem('auth');
         updateAuthState(set)({ isLogged: false, errors: '', loading: false });
         return;
      },
      singUp: async ({
         email,
         name,
         password,
      }): Promise<void | AxiosResponse<unknown>> => {
         try {
            const result = await SingUpAPI({ email, name, password });

            updateAuthState(set)({
               errors: '',
            });
            return result;
         } catch (error: any) {
            updateAuthState(set)({
               errors: error.response?.data,
            });
            return;
         }
      },
      getToken: () => {
         const res = localStorage.getItem('auth');
         return res;
      },
   },
}));
