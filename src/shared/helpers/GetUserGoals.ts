/* eslint-disable no-async-promise-executor */
import { GoalsUserRequests } from '../../api';

export interface IRequestRequest {
   month: string;
   expected_expense: string;
   expected_revenue: string;
}

export class UserGoalsManagement<T> {
   private params;
   public goals: T;

   constructor(params: { route: string; type: 'get' | 'post' | 'delete' }) {
      this.params = params;
      this.goals = {} as T;
   }

   async ListUserGoals() {
      try {
         const res = await GoalsUserRequests<T, undefined>({
            route: '/goals',
            type: 'get',
         });
         if (res) {
            this.goals = res.data;
         }
         return undefined;
      } catch (err) {
         return Promise.reject(err);
      }
   }

   async create(body: any): Promise<any> {
      try {
         const response = await GoalsUserRequests({
            route: this.params.route,
            type: this.params.type,
            body,
         });

         return Promise.resolve(response);
      } catch (err) {
         return Promise.reject(err);
      }
   }
}
