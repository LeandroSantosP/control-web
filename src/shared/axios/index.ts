import axios from 'axios';

interface AxiosParams {
   token?: string;
   params?: any;
}

export const api = ({ token, params }: AxiosParams) => {
   if (params) {
      return axios.create({
         baseURL: import.meta.env.VITE_API_HOST_DEVELOPMENT,
         headers: { Authorization: `Bearer ${token}` },
         params,
      });
   }

   return axios.create({
      baseURL: import.meta.env.VITE_API_HOST_DEVELOPMENT,
      headers: { Authorization: `Bearer ${token}` },
   });
};
