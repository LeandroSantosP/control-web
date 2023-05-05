interface singUpProps {
   email: string;
   password: string;
   name: string;
}

export interface authStorageProps {
   state: {
      errors: any;
      isLogged: boolean;
      loading: boolean;
   };
   actions: {
      login: (email: string, password: string) => Promise<UserResponse | void>;
      logout: () => void;
      singUp: (props: singUpProps) => any;
      getCredentials: () => Promise<any>;
      setCredentials: (data: any) => Promise<any>;
   };
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
