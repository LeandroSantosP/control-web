import { Fragment, useCallback, useEffect, useState } from 'react';
import { getTransactions } from '../../api';
import { Layout } from '../../components/Layout';
import { TransactionListItem } from '../../components/TransactionListItem/TransactionListItem';
import { useStorage } from '../../shared/modules/Storage';
import * as S from './DashBoardStyled';

interface TransactionDTO {
   id: string;
   description: string;
   due_date: string | null;
   userId: string;
   isSubscription: boolean | null;
   installments: number | null;
   create_at: Date;
   recurrence: null;
   value: number;
   updated_at: Date;
}

export const DashBoard = () => {
   const { state } = useStorage();
   const [transaction, setTransaction] = useState<TransactionDTO[]>([]);

   const fetchTransactions = useCallback(async () => {
      if (state.token !== undefined) {
         const result = await getTransactions();
         setTransaction(result!);
      }
   }, [state.token]);

   useEffect(() => {
      fetchTransactions();
   }, [fetchTransactions]);

   return (
      <Layout>
         {/* <h1> + DashBoard</h1> */}
         <S.DashboardWrapper>
            <S.TransactionHeader>
               <h2>Transações</h2>
               <S.AddButton>+</S.AddButton>
            </S.TransactionHeader>
            <S.UlWrapper>
               {transaction?.map((transaction) => (
                  <Fragment key={`${transaction.id}`}>
                     <TransactionListItem
                        account={transaction.description}
                        amount={transaction.value}
                        category="Category"
                        resolved={true}
                     />
                     <S.Divider />
                  </Fragment>
               ))}

               <S.Divider />
            </S.UlWrapper>
         </S.DashboardWrapper>
      </Layout>
   );
};
