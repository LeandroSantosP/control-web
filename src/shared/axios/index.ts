import axios from 'axios';

interface AxiosParams {
   token: string;
}

export const api = (params?: AxiosParams) => {
   console.log();

   return axios.create({
      baseURL: import.meta.env.VITE_API_HOST_DEVELOPMENT,
      headers: { Authorization: `Bearer ${params?.token}` },
   });
};
