import { ValidMonths } from '../../shared/myTypes/ValidMonths';
import { GoalsProps, IRemoveRequest } from '../store/goals/GoalsStorage';

export async function HandleDeleteAllGoals(
   remove: (props: IRemoveRequest) => Promise<void>,
   goals: GoalsProps | undefined
): Promise<void> {
   const UserGoalsRegisterForDelete = Object.entries(ValidMonths)
      .map(([key, value]) => {
         const months = goals?.MonthFormatted.find((i) => i.name === value);

         if (months) {
            return key;
         }
         return '';
      })
      .filter((i) => i !== '');

   if (UserGoalsRegisterForDelete.length === 0) {
      return;
   }

   await Promise.all(
      UserGoalsRegisterForDelete.map(async (month: any) => {
         await remove({ data: { data: { months: [month] } } });
         return;
      })
   );
}
