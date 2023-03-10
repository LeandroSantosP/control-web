import { createContext, useContext, useState } from 'react';
import { AxiosResponse } from 'axios';
import { api } from '../axios';
interface AuthContextProps {
  isLogged: boolean;
  login: (email: string, password: string) => Promise<UserResponse | void>;
  user: CredentialsProps | null;
  loading: boolean;
  singUp: ({
    email,
    name,
    password,
  }: signUpProps) => Promise<void | AxiosResponse<any, any>>;
  error: { message: string } | undefined;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface CredentialsProps {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export interface UserResponse {
  response?: {
    status: number;
    data: CredentialsProps;
  };
  status: number;
  data: CredentialsProps;
}

interface signUpProps {
  email: string;
  password: string;
  name: string;
}

export interface ErrosAxios {
  message: string;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<CredentialsProps | null>(null);
  const [error, setError] = useState<{ message: string }>();
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // useEffect(() => {
  //   if (isLogged === true) {
  //   }
  // }, []);

  async function login(
    email: string,
    password: string
  ): Promise<UserResponse | void> {
    setIsLogged(true);
    setLoading(true);
    try {
      const response: UserResponse = await api.get('/auth', {
        headers: {
          Authorization: 'Basic ' + btoa(email + ':' + password),
        },
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
      }

      setUser(response.data);
      setIsLogged(true);
      return response;
    } catch (err: any) {
      setError(err.response.data);
      setUser(null);
      setIsLogged(false);
      return;
    } finally {
      setLoading(false);
    }
  }

  async function singUp({
    email,
    name,
    password,
  }: signUpProps): Promise<void | AxiosResponse<unknown>> {
    setLoading(true);

    try {
      const result = await api.post('/users', {
        name,
        email,
        password,
      });
      setError({ message: '' });
      return result;
    } catch (erro: any) {
      console.log(erro);
      setError(erro.response?.data);
      return;
    } finally {
      setLoading(false);
    }
    return;
  }

  return (
    <AuthContext.Provider
      value={{ isLogged, loading, login, user, singUp, error: error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
