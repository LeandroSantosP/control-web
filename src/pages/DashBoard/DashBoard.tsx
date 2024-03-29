import { Command } from '@phosphor-icons/react';
import { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react';

import { StatusAccount } from '../../components/Molecules/StatusAccount/StatusAccount';
import { Transaction } from '../../components/Molecules/Transaction/Transaction';
import TransactionListItem from '../../components/Molecules/TransactionListItem/TransactionListItem';
import { Layout } from '../../components/providers/Layout/';

import { useTransactionContext } from '../../shared/contexts';

const TransactionGraphs = lazy(
   () =>
      import('../../components/Molecules/TransactionGraphs/TransactionGraphs')
);

import Balense from '../../shared/assets/balense.png';
import GraphDown from '../../shared/assets/graphDown.svg';
import GraphUp from '../../shared/assets/graphUp.svg';
import Wallet from '../../shared/assets/wallet.svg';

import { Divider } from '../../components/atoms/Divider/Divider';
import { Progress } from '../../components/atoms/Progress/Progress';
import { GraphHeader } from '../../components/Molecules/GraphHeader/GraphHeader';
import { DashBoardHeader } from '../../components/Molecules/TransactionHeader/DashBoardHeader';
import { authStorage, ProfileStorage } from '../../shared/store';
import * as S from './DashBoardStyled';

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
   const [skeletonTransactionItem, setSkeletonTransactionItem] = useState<
      JSX.Element[]
   >([]);
   const {
      open: WhenTransactionIsCreateWithSuccess,
      transaction,
      getTotalBalense,
   } = useTransactionContext();
   const {
      actions: { GetProfile },
   } = ProfileStorage();
   const {
      actions: { logout },
   } = authStorage();

   const [accountInfosList, setAccountInfosList] = useState<any[]>([]);
   const LURef = useRef<HTMLUListElement>(null);

   useEffect(() => {
      GetProfile();
      setSkeletonTransactionItem(() => {
         const amountTransaction = transaction?.transactions.length;
         if (
            transaction &&
            amountTransaction &&
            transaction.transactions.length < 7
         ) {
            const skeletonAmount = 6 - amountTransaction;
            const skeletonForRender = [];

            for (let skeleton = 0; skeleton < skeletonAmount; skeleton++) {
               skeletonForRender.push(<S.ListSkeleton key={skeleton} />);
            }
            return [...skeletonForRender];
         }

         if (transaction && transaction.transactions.length === 0) {
            const skeletonForRender = [];
            for (let skeleton = 0; skeleton < 6; skeleton++) {
               skeletonForRender.push(<S.ListSkeleton key={skeleton} />);
            }

            return [...skeletonForRender];
         }

         return [];
      });
      getTotalBalense()
         .then((response) => {
            const showBalense =
               transaction?.balense?.total === response.balense.total;
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
                     showBalense,
                  },
               ]);
         })
         .catch(() => {
            logout();
         });
   }, [
      getTotalBalense,
      transaction?.balense?.expense,
      transaction?.balense?.revenue,
      transaction?.balense?.total,
      WhenTransactionIsCreateWithSuccess,
      logout,
      transaction,
      GetProfile,
   ]);

   return (
      <Layout>
         <DashBoardHeader
            title="DashBoard"
            hasFilter={true}
            icon={<Command size={35} />}
         />
         <S.Wrapper>
            <S.DashboardWrapper
               flex={2 / 3}
               overflowY="off"
               flexDirection="row"
               gap="1rem"
            >
               <S.StatusWrapper flex={1 / 4}>
                  {accountInfosList?.map((accountInfos) => {
                     if (
                        accountInfos.description === 'Balanco' &&
                        accountInfos.showBalense
                     ) {
                        return;
                     }

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
               {/* Gambiara da forte */}
               <div style={{ height: '1px' }}>
                  <S.UlWrapper ref={LURef}>
                     {transaction?.transactions?.map((transaction) => {
                        return (
                           <Fragment key={`${transaction.id}`}>
                              <TransactionListItem
                                 params={{
                                    ...transaction,
                                 }}
                              />
                              <Divider
                                 width="90%"
                                 bg="rgba(160, 160, 160, 0.46)"
                                 height="1px"
                              />
                           </Fragment>
                        );
                     })}
                     {skeletonTransactionItem.map((skeleton) => {
                        return (
                           <Fragment key={`${skeleton.key}`}>
                              <Divider
                                 width="90%"
                                 bg="rgba(160, 160, 160, 0.46)"
                                 height="1px"
                              />
                              {skeleton}
                           </Fragment>
                        );
                     })}
                  </S.UlWrapper>
               </div>
            </S.DashboardWrapper>
         </S.Wrapper>
      </Layout>
   );
};
