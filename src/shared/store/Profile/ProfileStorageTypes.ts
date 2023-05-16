import { AxiosError } from 'axios';

export interface CreateProfileProps {
   props: {
      Birthday?: string;
      phonenumber?: string;
      profession?: string;
      salary?: string;
   };
   avatar: File | undefined;
   isUpdate: boolean;
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
      CreateUpdateUserProfile: (params: CreateProfileProps) => Promise<void>;
      GetProfile(): Promise<ProfileProps | any>;
      logout: () => void;
      reset: () => void;
   };
}
