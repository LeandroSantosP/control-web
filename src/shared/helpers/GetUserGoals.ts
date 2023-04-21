import { GoalsUserRequests } from '../../api';

export interface IRequestRequest {
   month: string;
   expected_expense: string;
   expected_revenue: string;
}

export class UserGoalsManagement<T> {
   private params;
   public goals: T;

   constructor(params: {
      route: string;
      type: 'get' | 'post' | 'delete' | 'patch';
   }) {
      this.params = params;
      this.goals = {} as T;
   }

   async ListUserGoals() {
      try {
         const res = await GoalsUserRequests<T, undefined, any>({
            route: this.params.route,
            type: this.params.type,
         });

         if (res) {
            this.goals = res.data;
         }
         return undefined;
      } catch (err) {
         return Promise.reject(err);
      }
   }

   async create<B, R>(body: B) {
      try {
         const response = await GoalsUserRequests<B, undefined, R>({
            route: this.params.route,
            type: this.params.type,
            body,
         });

         return Promise.resolve(response);
      } catch (err) {
         return Promise.reject(err);
      }
   }

   async remove<B, R>(body: B) {
      const response = await GoalsUserRequests<B, undefined, R>({
         route: this.params.route,
         type: this.params.type,
         body,
      });

      return response;
   }
}
