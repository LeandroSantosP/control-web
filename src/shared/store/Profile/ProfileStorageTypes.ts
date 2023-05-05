import { AxiosError } from 'axios';

export interface CreateProfileProps {
   props: {
      Birthday: string;
      phonenumber: string;
      profession: string;
      salary: string;
   };
   avatar: any;
}

export interface ProfileProps {
   id: string;
   avatar: string;
   profession: string;
   salary: string;
   phonenumber: string;
   dateOfBirth: string;
   user: {
      name: string;
      email: string;
      id: string;
   };
}

export interface ProfileStorageProps {
   state: {
      userProfile: any | null;
      loading: boolean;
      error: AxiosError | null;
   };
   actions: {
      CreateUserProfile: (param: CreateProfileProps) => void;
      GetProfile(): Promise<ProfileProps | any>;
      logout: () => void;
   };
}
