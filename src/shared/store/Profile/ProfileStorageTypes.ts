import { AxiosError } from 'axios';

export interface CreateProfileProps {
   props: {
      Birthday?: string;
      phonenumber?: string;
      profession?: string;
      salary?: string;
   };
   avatar: File | undefined;
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
type userProfileType = ProfileProps;

export interface ProfileStorageProps {
   state: {
      userProfile: userProfileType | null;
      loading: boolean;
      error: AxiosError | null;
   };
   actions: {
      CreateUserProfile: (param: CreateProfileProps) => Promise<void>;
      GetProfile(): Promise<ProfileProps | any>;
      logout: () => void;
   };
}