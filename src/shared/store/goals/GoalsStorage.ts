import { create } from 'zustand';
import { UserGoalsManagement } from '../../helpers/GetUserGoals';
import { AxiosError } from 'axios';

interface createOrUpdatedGoalsProps {
   createIfNotExist: boolean;
   dataForUpdate: Array<{
      month: string;
      expectated_expense?: string;
      expectated_revenue?: string;
   }>;
}

export interface GoalsProps {
   user: {
      avatar: any;
      created_at: string;
      id: string;
      name: string;
   };
   MonthFormatted: Array<{
      name: string;
      number: number;
      expectated_expense: string;
      expectated_revenue: string;
   }>;
}

interface IRemoveRequest {
   months: string[];
}

interface ActionProps {
   createOrUpdated: (
      props: createOrUpdatedGoalsProps
   ) => Promise<void | AxiosError>;
   list: () => Promise<GoalsProps>;
   remove: (props: IRemoveRequest) => Promise<void>;
}

interface StoreProps {
   state: {
      goals: GoalsProps | undefined;
   };
   actions: ActionProps;
}

export const useGoalsStorage = create<StoreProps>((set) => ({
   state: {
      goals: undefined,
   },
   actions: {
      createOrUpdated: async ({
         createIfNotExist,
         dataForUpdate,
      }: createOrUpdatedGoalsProps): Promise<void | AxiosError> => {
         const response = new UserGoalsManagement<GoalsProps>({
            route: '/goals',
            type: 'patch',
         });

         await response.create<createOrUpdatedGoalsProps, void>({
            createIfNotExist,
            dataForUpdate,
         });

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
               return { state: { goals } };
            }

            return storage;
         });

         return goals;
      },
      remove: async ({ months }: IRemoveRequest) => {
         const response = new UserGoalsManagement({
            route: '/goals',
            type: 'delete',
         });

         await response.remove(months);

         return;
      },
   },
}));
