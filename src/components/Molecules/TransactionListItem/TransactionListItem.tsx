import * as S from './TransactionLIstItem';
import { format } from 'date-fns';

export interface TransactionListItemProps {
   id: string;
   description: string;
   value: string;
   recurrence: string;
   installments: 12;
   isSubscription: boolean | null;
   due_date: string;
   resolved: boolean;
   created_at: string;
   updated_at: string;
   type: string;
   userId: string;
   transactionsCategoryId: string;
}

const FormatCurense = (amount: number) =>
   new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(amount);

export const TransactionListItem = (params: TransactionListItemProps) => {
   const { value: amount, resolved, due_date, type } = params;

   let currentDueDateFormatted;
   if (due_date !== null) {
      currentDueDateFormatted = format(
         new Date(due_date),
         'dd-MM-yyyy'
      ).replace(/-/g, '/');
   }

   return (
      <>
         <S.TransactionItemLi>
            <S.TransactionContent>
               <S.DueDate>
                  {due_date !== null && 'Data De Vencimento'}
               </S.DueDate>
               <S.DueDate>{currentDueDateFormatted}</S.DueDate>
            </S.TransactionContent>
            <S.TransactionContent>
               <S.Amount negative={Number(amount) <= 0}>
                  {FormatCurense(Number(amount))}
               </S.Amount>
               <span>
                  {type === 'revenue'
                     ? 'Receita'
                     : type === 'expense' && resolved === false
                     ? 'Nao pago'
                     : 'Paga'}
               </span>
            </S.TransactionContent>
         </S.TransactionItemLi>
      </>
   );
};
