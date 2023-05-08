import { create, SetState } from 'zustand';
import type {
   CreateProfileProps,
   ProfileProps,
   ProfileStorageProps,
} from './ProfileStorageTypes';

import { ProfileManagement } from '../../helpers/ConfigProfile';

export const updatedStates =
   (set: SetState<ProfileStorageProps>) =>
   (newState: Partial<ProfileStorageProps['state']>) => {
      set((storage) => ({
         ...storage,
         state: {
            ...storage.state,
            ...newState,
         },
      }));
   };

const ProfileStorage = create<ProfileStorageProps>((set, get) => ({
   state: {
      error: null,
      loading: false,
      userProfile: null,
   },
   actions: {
      logout: () => {
         localStorage.removeItem('auth');
         return;
      },
      GetProfile: async () => {
         const result = new ProfileManagement<ProfileProps>({
            route: '/user/profile',
            type: 'get',
         });

         try {
            const response = await result.getProfile<any, ProfileProps>();

            if (response && response.status == 200) {
               updatedStates(set)({ userProfile: response.data });
               return Promise.resolve(undefined);
            }
         } catch (error: any) {
            if (error && error.response.status === 404) {
               updatedStates(set)({ userProfile: null });
               return error.response.data.message;
            }

            if (
               error &&
               error.response.status === 401 &&
               error.response.data.message === 'Invalid Token'
            ) {
               get().actions.logout();
               return;
            }

            return Promise.reject(error);
         }
      },
      CreateUserProfile: async (params) => {
         const result = new ProfileManagement({
            route: '/user/profile',
            type: 'post',
         });

         updatedStates(set)({ loading: true });

         try {
            await result.create<CreateProfileProps, any>({
               ...params,
            });
            await get().actions.GetProfile();
            return;
         } catch (error: any) {
            updatedStates(set)({ error });
            return;
         } finally {
            updatedStates(set)({ loading: false });
         }
      },
   },
}));

export { ProfileStorage };
