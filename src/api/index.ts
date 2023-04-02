import axios from 'axios';
import { api } from '../shared/axios';

interface LoginProps {
   email: string;
   password: string;
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

const auth = {} as { token: string };
export const AuthCredentials = (token: string) => {
   auth.token = token;
};

export const getTransactions = async ({ month }: { month?: string }) => {
   try {
      if (auth.token) {
         const response = await api({
            token: auth.token,
            params: { month },
         }).get(`/transaction`);

         return Promise.resolve(response.data);
      }
   } catch (err: any) {
      return Promise.reject(err);
   }
};

export interface getTransactionBySubscriptionProps {
   month?: string;
   isSubscription?: string;
}

export const getTransactionBySubscription = async <T>({
   month,
   isSubscription,
}: getTransactionBySubscriptionProps) => {
   try {
      if (auth.token) {
         const response = await api({
            token: auth.token,
            params: { month, isSubscription },
         }).get<T>('/transaction/bySubscriptions');

         return Promise.resolve(response.data);
      }
   } catch (error) {
      return Promise.reject(error);
   }
};

export const CreateTransaction = async ({
   value,
   description,
   dueDate,
}: {
   value: string;
   description: string;
   dueDate: string;
}) => {
   try {
      const res = await api({ token: auth.token }).post('/transaction', {
         value,
         description,
         dueDate,
      });
      return Promise.resolve(res.data);
   } catch (error) {
      return Promise.reject(error);
   }
};

export const GetUserNotification = async (NotificationToken: string) => {
   try {
      if (auth.token) {
         const res = await api({
            token: auth.token,
         }).post('/push', {
            token: NotificationToken,
         });

         return Promise.resolve(res);
      }
   } catch (err: any) {
      return Promise.reject(err);
   }
};
