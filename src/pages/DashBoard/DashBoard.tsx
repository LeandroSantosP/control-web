import { Fragment, useCallback, useEffect, useState } from 'react';
import { Command } from '@phosphor-icons/react';

import { TransactionListItem } from '../../components/Molecules/TransactionListItem/TransactionListItem';
import { StatusAccount } from '../../components/Molecules/StatusAccount/StatusAccount';
import { Transaction } from '../../components/Molecules/Transaction/Transaction';
import { Layout } from '../../components/providers/Layout/';
import { useStorage } from '../../shared/modules/Storage';
import { useTransactionContext } from '../../shared/contexts';
import { Box } from '../../components/atoms/Box/Box';
import { Icon } from '../../components/atoms/Icons/Icon';
import { getTransactions } from '../../api';
import Wallet from '../../shared/assets/wallet.svg';
import GraphUp from '../../shared/assets/graphUp.svg';
import GraphDown from '../../shared/assets/graphDown.svg';

import * as S from './DashBoardStyled';
import { Divider } from '../../components/atoms/Divider/Divider';
import { DashBoardHeader } from '../../components/Molecules/TransactionHeader/DashBoardHeader';

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
   resolved: boolean;
   updated_at: Date;
}

export const DashBoard = () => {
   const { state } = useStorage();
   const { open: WhenTransactionIsCreateWithSuccess } = useTransactionContext();
   const [transaction, setTransaction] = useState<TransactionDTO[]>([]);

   const fetchTransactions = useCallback(async () => {
      if (state.token !== undefined) {
         const result = await getTransactions();
         setTransaction(result);
      }
   }, [state.token]);

   useEffect(() => {
      fetchTransactions();
   }, [fetchTransactions, WhenTransactionIsCreateWithSuccess]);

   const accountInfosList = [
      {
         description: 'Saldo Atual',
         amount: '10.300',
         logo: Wallet,
         alt: 'Wallet',
      },
      {
         description: 'Receita',
         amount: '10.300',
         logo: GraphUp,
         alt: 'Wallet',
      },
      {
         description: 'Despesas',
         amount: '10.300',
         logo: GraphDown,
         alt: 'Wallet',
      },
   ];

   return (
      <Layout>
         <DashBoardHeader title="DashBoard " icon={<Command size={35} />} />
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
               <S.StatusWrapper flex={1 / 3}>
                  {accountInfosList.map((accountInfos) => (
                     <StatusAccount
                        key={accountInfos.logo}
                        Logo={accountInfos.logo}
                        alt={accountInfos.alt}
                        amount={accountInfos.amount}
                        description={accountInfos.description}
                     />
                  ))}
               </S.StatusWrapper>
               <S.StatusWrapper background="red" flex={2 / 3}>
                  <h1>oi</h1>
               </S.StatusWrapper>
            </S.DashboardWrapper>

            <S.DashboardWrapper flex={1 / 3}>
               <S.TransactionHeader>
                  <h2>Transações</h2>
                  <Transaction />
               </S.TransactionHeader>
               <S.UlWrapper>
                  {transaction?.map((transaction: any) => (
                     <Fragment key={`${transaction.id}`}>
                        <TransactionListItem
                           account={transaction.description}
                           amount={transaction.value}
                           category="Category"
                           resolved={transaction.resolved}
                        />
                        <Divider
                           width="90%"
                           bg="rgba(160, 160, 160, 0.46)"
                           height="1px"
                        />
                     </Fragment>
                  ))}
                  <Divider
                     width="90%"
                     bg="rgba(160, 160, 160, 0.46)"
                     height="1px"
                  />
               </S.UlWrapper>
            </S.DashboardWrapper>
         </Box>
      </Layout>
   );
};
