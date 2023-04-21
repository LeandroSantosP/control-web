import { api } from '../shared/axios';

interface LoginProps {
   email: string;
   password: string;
}

function getToken() {
   const res = localStorage.getItem('auth');
   return res && JSON.parse(res);
}

export const loginAPI = async ({ email, password }: LoginProps) =>
   await api({}).get('/auth', {
      headers: {
         Authorization: 'Basic ' + btoa(email + ':' + password),
      },
   });

interface singUpProps extends LoginProps {
   name: string;
}

export const SingUpAPI = async ({ name, email, password }: singUpProps) => {
   try {
      const res = await api({}).post('/user/create', {
         name,
         email,
         password,
      });

      return Promise.resolve(res);
   } catch (err) {
      return Promise.reject(err);
   }
};

export const ResolvedTransactionApi = async (
   transactionId: string
): Promise<void | any> => {
   const { token } = getToken();
   try {
      if (token) {
         const response = await api({
            token,
         }).patch<void>(`/transaction/resolved/${transactionId}`);
         return Promise.resolve(response);
      }
   } catch (error) {
      return Promise.resolve(error);
   }
};

export const getTransactions = async <T>({ month }: { month?: string }) => {
   const { token } = getToken();

   try {
      if (token) {
         const response = await api({
            token,
            params: { month },
         }).get<T>(`/transaction`);

         return Promise.resolve(response.data);
      }
   } catch (err: any) {
      return Promise.reject(err);
   }
};

export interface getTransactionByParamsProps {
   month?: string;
   isSubscription?: string;
   resolved?: string;
   revenue?: string;
}

export const getTransactionByParams = async <T>({
   month,
   isSubscription,
   resolved,
   revenue,
}: getTransactionByParamsProps) => {
   const { token } = getToken();

   try {
      if (token) {
         const response = await api({
            token: token,
            params: { month, isSubscription, resolved, revenue },
         }).get<T>('/transaction/bySubscriptions');

         return Promise.resolve(response.data);
      }
   } catch (error) {
      return Promise.reject(error);
   }
};

export const CreateTransaction = async <T>({
   value,
   description,
   date,
   installments,
   isSubscription,
   category,
   recurrency,
   transactionType,
}: {
   value: string;
   description: string;
   date: string;
   category: string;
   recurrency: string;
   transactionType: string;
   isSubscription: boolean;
   installments: number;
}) => {
   const { token } = getToken();
   if (transactionType === 'Receita') {
      try {
         const res = await api({ token }).post<T>('/transaction', {
            value,
            description,
            categoryType: category,
            dueDate: (Number(value) < 0 && date) || undefined,
            filingDate: (Number(value) > 0 && date) || undefined,
         });

         return Promise.resolve(res.data);
      } catch (error) {
         return Promise.reject(error);
      }
   }

   try {
      const res = await api({ token }).post<T>('/transaction/recurrent', {
         value,
         description,
         isSubscription,
         installments,
         categoryType: category,
         recurrence: recurrency,
         due_date: Number(value) < 0 && date,
      });

      return Promise.resolve(res.data);
   } catch (error) {
      return Promise.reject(error);
   }
};

export const GetUserNotification = async (NotificationToken: string) => {
   try {
      const { token } = getToken();
      if (token) {
         const res = await api({
            token,
         }).post('/push', {
            token: NotificationToken,
         });

         return Promise.resolve(res);
      }
   } catch (err: any) {
      return Promise.reject(err);
   }
};

interface GoalsUserRequestsProps<B, P> {
   type: 'get' | 'post' | 'delete' | 'patch';
   route: string;
   body?: B;
   params?: P;
}

export const GoalsUserRequests = async <B, P, R>({
   route,
   type,
   body,
   params,
}: GoalsUserRequestsProps<B, P>) => {
   const { token } = getToken();

   try {
      if (token) {
         const res = await api({
            token,
            params,
         })[type]<R>(route, {
            ...body,
         });

         return Promise.resolve(res);
      }
   } catch (erro: any) {
      return Promise.reject(erro);
   }
};
