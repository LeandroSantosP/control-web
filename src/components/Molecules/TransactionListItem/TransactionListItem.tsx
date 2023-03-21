import * as S from './TransactionLIstItem';

interface TransactionListItemProps {
   account: string;
   category: string;
   amount: number;
   resolved: boolean;
   isNegative: boolean;
}

const FormatCurense = (amount: number) =>
   new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(amount);

export const TransactionListItem = (params: TransactionListItemProps) => {
   const { account, amount, category, resolved, isNegative } = params;

   return (
      <>
         <S.TransactionItemLi>
            <S.TransactionContent>
               <h3>{account}</h3> <span> {category}</span>
            </S.TransactionContent>
            <S.TransactionContent>
               <S.Amount negative={isNegative}>
                  {FormatCurense(amount)}
               </S.Amount>
               <span>{resolved ? 'Pago' : 'Não Paga'}</span>
            </S.TransactionContent>
         </S.TransactionItemLi>
      </>
   );
};
