import { AxiosError } from 'axios';

export interface createOrUpdatedGoalsProps {
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

export interface IRemoveRequest {
   data: { data: { months: string[] } };
}

interface ActionProps {
   createOrUpdated: (
      props: createOrUpdatedGoalsProps
   ) => Promise<void | AxiosError>;
   list: () => Promise<GoalsProps>;
   remove: (props: IRemoveRequest) => Promise<void>;
}

export interface StoreProps {
   state: {
      goals: GoalsProps | undefined;
      isLoading: boolean;
   };
   actions: ActionProps;
}
