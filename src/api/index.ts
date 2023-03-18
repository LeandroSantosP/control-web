import { api } from '../shared/axios';

interface LoginProps {
   email: string;
   password: string;
}

export const loginAPI = async ({ email, password }: LoginProps) =>
   await api().get('/auth', {
      headers: {
         Authorization: 'Basic ' + btoa(email + ':' + password),
      },
   });

interface singUpProps extends LoginProps {
   name: string;
}

export const SingUpAPI = async ({ name, email, password }: singUpProps) => {
   try {
      const res = await api().post('/user/create', {
         name,
         email,
         password,
      });

      return Promise.resolve(res);
   } catch (err) {
      return Promise.reject(err);
   }
};

// export const AuthCredentials = () => {
//    return {
//       token: '',
//       async get() {
//          return Promise.resolve(this.token);
//       },
//       async set(token?: string) {
//          console.log(token);

//          if (token) {
//             this.token = await token;
//          }

//          return true;
//       },
//    };
// };

const auth = {} as { token: string };
export const AuthCredentials = (token: string) => {
   auth.token = token;
};

export const getTransactions = async () => {
   try {
      if (auth?.token) {
         const res = await api({ token: auth.token }).get('/transaction');
         return Promise.resolve(res.data);
      }
   } catch (err) {
      return Promise.reject(err);
   }
};
