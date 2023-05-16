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
      reset: () => {
         updatedStates(set)({ error: null, loading: false, userProfile: null });
         return;
      },
      logout: () => {
         localStorage.removeItem('auth');
         updatedStates(set)({ loading: true });
         return;
      },
      GetProfile: async () => {
         const result = new ProfileManagement<ProfileProps>({
            route: '/user/profile',
            type: 'get',
         });
         updatedStates(set)({ loading: true });

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
         } finally {
            updatedStates(set)({ loading: false });
         }
      },
      CreateUpdateUserProfile: async ({ isUpdate, ...params }) => {
         const result = new ProfileManagement({
            route: '/user/profile',
            type: !isUpdate ? 'post' : 'patch',
         });

         updatedStates(set)({ loading: true });

         try {
            await result.create<Omit<CreateProfileProps, 'isUpdate'>, any>({
               ...params,
            });

            return;
         } catch (error: any) {
            updatedStates(set)({ error });
            return;
         } finally {
            await get().actions.GetProfile();
            updatedStates(set)({ loading: false });
         }
      },
   },
}));

export { ProfileStorage };
