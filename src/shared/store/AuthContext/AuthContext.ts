import { AxiosError, AxiosResponse } from 'axios';
import { create, SetState } from 'zustand';
import {
   loginAPI,
   ResetPassword,
   sendMailReset,
   SingUpAPI,
} from '../../../api/index';
import { useLocalStorage } from '../../modules/Storage';
import { LocalStoreOperator } from '../../modules/Storage/persistence-adepter/adepter';
import { authStorageProps, UserResponse } from './AuthContextTypes';

const isLoggedInitialValue = () => {
   const token = localStorage.getItem('auth');
   return token ? true : false;
};

async function storageProvider({
   type,
   data,
}: {
   type: 'get' | 'set';
   data?: any;
}): Promise<any | Error> {
   const localStoreOperator = new LocalStoreOperator();
   const UseLocalStorage = new useLocalStorage<{ data: string }>(
      localStoreOperator
   );
   try {
      await UseLocalStorage.StorageProvider({
         operationType: type,
         data,
      });

      return UseLocalStorage.data || undefined;
   } catch (error: any) {
      return Promise.reject(error);
   }
}

const updateAuthState =
   (set: SetState<authStorageProps>) =>
   (newState: Partial<authStorageProps['state']>) => {
      set((storage) => ({
         ...storage,
         state: {
            ...storage.state,
            ...newState,
         },
      }));
   };

export const authStorage = create<authStorageProps>((set, get) => ({
   state: {
      errors: '',
      isLogged: isLoggedInitialValue(),
      loading: false,
      credentials: '',
   },
   actions: {
      resetPass: async (params: { newPass: string; token: string }) => {
         updateAuthState(set)({ isLogged: true });
         try {
            await ResetPassword({ ...params });

            return;
         } catch (error: any) {
            return error;
         } finally {
            updateAuthState(set)({ isLogged: false });
         }
      },
      sendMail: async (email: string): Promise<void | AxiosError | true> => {
         updateAuthState(set)({ isLogged: true });
         try {
            await sendMailReset(email);
            return true;
         } catch (error: any) {
            return error;
         } finally {
            updateAuthState(set)({ isLogged: false });
         }
      },
      login: async (email, password): Promise<UserResponse | void> => {
         try {
            const response: UserResponse = await loginAPI({ email, password });

            if (response.status === 200) {
               get().actions.setCredentials(response.data);
               updateAuthState(set)({ isLogged: true });
            }

            return response;
         } catch (error: any) {
            updateAuthState(set)({
               isLogged: false,
               errors: error.response?.data?.message,
            });

            return error;
         }
      },
      logout: () => {
         localStorage.removeItem('auth');
         updateAuthState(set)({
            isLogged: false,
            errors: '',
            loading: false,
         });
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
      getCredentials: async () => {
         return await storageProvider({ type: 'get' });
      },
      setCredentials: async (data): Promise<void | Error> => {
         await storageProvider({ type: 'set', data });
      },
   },
}));
