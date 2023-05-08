import { AxiosResponse } from 'axios';
import { GetProfileRequests, ProfileRequests } from '../../api';

export class ProfileManagement<T> {
   private _params;
   public profile: T;

   constructor(params: {
      route: string;
      type: 'get' | 'post' | 'delete' | 'patch';
   }) {
      this._params = params;
      this.profile = {} as T;
   }

   async useRouter<B, O>(
      body?: B,
      getRequest?: boolean
   ): Promise<AxiosResponse<O, any> | void> {
      try {
         if (getRequest) {
            const res = await GetProfileRequests<B, undefined, O>({
               route: this._params.route,
               type: this._params.type,
            });
            if (res) {
               return Promise.resolve(res);
            }
            return;
         }

         const res = ProfileRequests<B, undefined>({
            type: this._params.type,
            route: this._params.route,
            body,
         });

         if (res) {
            return Promise.resolve(res);
         }
      } catch (error) {
         return Promise.reject(error);
      }
   }

   async create<I, O>(body: I): Promise<AxiosResponse<O, any> | void> {
      return await this.useRouter<I, O>(body);
   }

   async update<I, O>(body: I): Promise<AxiosResponse<O, any> | void> {
      return await this.useRouter<I, O>(body);
   }

   async getProfile<I, O>(): Promise<AxiosResponse<O, any> | void> {
      this.profile = (await this.useRouter<I, O>(undefined, true)) as any;
      return await this.useRouter<I, O>(undefined, true);
   }
}
