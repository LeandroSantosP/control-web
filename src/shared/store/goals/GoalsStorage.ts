import { create, SetState } from 'zustand';
import { AxiosError } from 'axios';
import { UserGoalsManagement } from '../../helpers/ConfigUserGoals';
import {
   GoalsProps,
   IRemoveRequest,
   createOrUpdatedGoalsProps,
   StoreProps,
} from './GoalsStorageTypes';

export const updatedStates =
   (set: SetState<StoreProps>) => (newState: Partial<StoreProps['state']>) => {
      set((storage) => ({
         ...storage,
         state: {
            ...storage.state,
            ...newState,
         },
      }));
   };

export const GoalsStorage = create<StoreProps>((set, get) => ({
   state: {
      goals: undefined,
      isLoading: false,
   },
   actions: {
      createOrUpdated: async ({
         createIfNotExist,
         dataForUpdate,
      }: createOrUpdatedGoalsProps): Promise<void | AxiosError> => {
         updatedStates(set)({ isLoading: true });

         const response = new UserGoalsManagement<GoalsProps>({
            route: '/goals',
            type: 'patch',
         });

         await response.create<createOrUpdatedGoalsProps, void>({
            createIfNotExist,
            dataForUpdate,
         });

         await get().actions.list();

         updatedStates(set)({ isLoading: false });

         return;
      },
      list: async () => {
         const response = new UserGoalsManagement<GoalsProps>({
            route: '/goals',
            type: 'get',
         });
         await response?.ListUserGoals();

         const goals = response.goals;

         set((storage) => {
            if (storage !== undefined) {
               return { state: { ...storage.state, goals } };
            }

            return storage;
         });

         return goals;
      },
      remove: async ({ data }: IRemoveRequest) => {
         const response = new UserGoalsManagement({
            route: '/goals',
            type: 'delete',
         });

         await response.remove<{ data: { months: string[] } }, any>(data);
         await get().actions.list();

         return;
      },
   },
}));
