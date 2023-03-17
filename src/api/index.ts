import { api } from '../shared/axios';

interface LoginProps {
  email: string;
  password: string;
}

export const loginAPI = async ({ email, password }: LoginProps) =>
  await api.get('/auth', {
    headers: {
      Authorization: 'Basic ' + btoa(email + ':' + password),
    },
  });

interface singUpProps extends LoginProps {
  name: string;
}

export const SingUpAPI = async ({ name, email, password }: singUpProps) => {
  try {
    const res = await api.post('/user/create', {
      name,
      email,
      password,
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
