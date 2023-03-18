import { format } from 'path';
import * as S from './TransactionLIstItem';

interface TransactionListItemProps {
   account: string;
   category: string;
   amount: number;
   resolved: boolean;
}

const FormatCurense = (value: number) =>
   new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(value);

export const TransactionListItem = (params: TransactionListItemProps) => {
   const { account, amount, category, resolved } = params;
   return (
      <>
         <S.TransactionItemLi>
            <S.TransactionContent>
               <h3>{account}</h3> <span> {category}</span>
            </S.TransactionContent>
            <S.TransactionContent>
               <S.Amount negative={amount < 0}>
                  {FormatCurense(amount)}
               </S.Amount>
               <span>{resolved ? 'Pago' : 'Não Paga'}</span>
            </S.TransactionContent>
         </S.TransactionItemLi>
      </>
   );
};