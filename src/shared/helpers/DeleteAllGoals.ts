import { ValidMonths } from '../../shared/myTypes/ValidMonths';
import { handleShowingFlashMessageProps } from '../contexts';
import { GoalsProps, IRemoveRequest } from '../store/goals/GoalsStorage';

export async function HandleDeleteAllGoals(
   remove: (props: IRemoveRequest) => Promise<void>,
   goals: GoalsProps | undefined,
   userConfirmation: (props: handleShowingFlashMessageProps) => void
): Promise<void> {
   const confim = confirm('Realmente deseja deletar todos os seus objetivos');

   if (confim) {
      const UserGoalsRegisterForDelete = Object.entries(ValidMonths)
         .map(([key, value]) => {
            const months = goals?.MonthFormatted.find((i) => i.name === value);

            if (months) {
               return key;
            }
            return '';
         })
         .filter((i) => i !== '');

      userConfirmation({
         message: 'Todos os seus objetivos foram deletados com sucesso!',
         haveButton: false,
         timer: 4000,
         type: 'success',
      });

      if (UserGoalsRegisterForDelete.length === 0) {
         return;
      }

      await Promise.all(
         UserGoalsRegisterForDelete.map(async (month: any) => {
            await remove({ data: { data: { months: [month] } } });
            return;
         })
      );

      return;
   }

   userConfirmation({
      message: 'Operação cancelada!',
      haveButton: false,
      timer: 4000,
      type: 'warning',
   });

   return;
}
