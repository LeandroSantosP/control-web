import { Fragment, useCallback, useEffect, useState } from 'react';
import { Command } from '@phosphor-icons/react';
import { lazy, Suspense } from 'react';

import TransactionListItem from '../../components/Molecules/TransactionListItem/TransactionListItem';
import { StatusAccount } from '../../components/Molecules/StatusAccount/StatusAccount';
import { Transaction } from '../../components/Molecules/Transaction/Transaction';
import { Layout } from '../../components/providers/Layout/';

import { useTransactionContext } from '../../shared/contexts';
import { Box } from '../../components/atoms/Box/Box';

const TransactionGraphs = lazy(
   () =>
      import('../../components/Molecules/TransactionGraphs/TransactionGraphs')
);

import Wallet from '../../shared/assets/wallet.svg';
import GraphUp from '../../shared/assets/graphUp.svg';
import GraphDown from '../../shared/assets/graphDown.svg';
import Balense from '../../shared/assets/balense.png';

import * as S from './DashBoardStyled';
import { Divider } from '../../components/atoms/Divider/Divider';
import { DashBoardHeader } from '../../components/Molecules/TransactionHeader/DashBoardHeader';
import { Progress } from '../../components/atoms/Progress/Progress';
import { GraphHeader } from '../../components/Molecules/GraphHeader/GraphHeader';

interface Transaction {
   id: string;
   description: string;
   due_date: string | null;
   userId: string;
   isSubscription: boolean | null;
   installments: number | null;
   create_at: Date;
   recurrence: null;
   value: number;
   resolved: boolean;
   updated_at: Date;
}

export const DashBoard = () => {
   const {
      open: WhenTransactionIsCreateWithSuccess,
      GetTransaction,
      transaction,
      getTotalBalense,
   } = useTransactionContext();

   const [accountInfosList, setAccountInfosList] = useState<any[]>([]);

   const fetchTransactions = useCallback(async () => {
      await GetTransaction({});
   }, [GetTransaction]);

   useEffect(() => {
      getTotalBalense().then((response) => {
         response?.balense?.total || '0',
            setAccountInfosList([
               {
                  description: 'Saldo Atual',
                  amount: response?.balense?.total || '0',
                  logo: Wallet,
                  alt: 'Wallet',
               },
               {
                  description: 'Receita',
                  amount: transaction?.balense?.revenue || '0',
                  logo: GraphUp,
                  alt: 'Wallet',
               },
               {
                  description: 'Despesas',
                  amount: transaction?.balense?.expense || '0',
                  logo: GraphDown,
                  alt: 'Despesas',
               },
               {
                  description: 'Balanco',
                  amount: transaction?.balense?.total || '0',
                  logo: Balense,
                  alt: 'Balense',
               },
            ]);
      });
   }, [
      getTotalBalense,
      transaction?.balense?.expense,
      transaction?.balense?.revenue,
      transaction?.balense?.total,
   ]);

   useEffect(() => {
      fetchTransactions();
   }, [fetchTransactions, WhenTransactionIsCreateWithSuccess]);

   return (
      <Layout>
         <DashBoardHeader
            title="DashBoard"
            hasFilter={true}
            icon={<Command size={35} />}
         />
         <Box
            display="flex"
            width="100%"
            height="calc(100% - 100px)"
            flexDirection="row"
            gap="2rem"
            margin=" 0 0 0 10rems"
         >
            <S.DashboardWrapper
               flex={2 / 3}
               overflowY="off"
               flexDirection="row"
               gap="1rem"
            >
               <S.StatusWrapper flex={1 / 4}>
                  {accountInfosList?.map((accountInfos) => {
                     return (
                        <StatusAccount
                           key={accountInfos.logo}
                           Logo={accountInfos.logo}
                           alt={accountInfos.alt}
                           amount={accountInfos.amount}
                           description={accountInfos.description}
                        />
                     );
                  })}
               </S.StatusWrapper>
               <S.StatusWrapper flex={3 / 4}>
                  <GraphHeader />
                  <Suspense fallback={<Progress />}>
                     <TransactionGraphs />
                  </Suspense>
               </S.StatusWrapper>
            </S.DashboardWrapper>
            <S.DashboardWrapper flex={1 / 3}>
               <S.TransactionHeader>
                  <Transaction />
               </S.TransactionHeader>
               <S.UlWrapper>
                  {transaction?.transactions?.map((transaction) => {
                     return (
                        <Fragment key={`${transaction.id}`}>
                           <TransactionListItem params={transaction} />
                           <Divider
                              width="90%"
                              bg="rgba(160, 160, 160, 0.46)"
                              height="1px"
                           />
                        </Fragment>
                     );
                  })}
               </S.UlWrapper>
            </S.DashboardWrapper>
         </Box>
      </Layout>
   );
};
