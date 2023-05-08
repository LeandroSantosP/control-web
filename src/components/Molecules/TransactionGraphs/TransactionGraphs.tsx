import { memo, useCallback, useEffect, useState } from 'react';
import { ApexConfigTransactionGraph } from '../../../shared/helpers/ApexConfig';

import { Transaction, useTransactionContext } from '../../../shared/contexts';
import { GoalsStorage } from '../../../shared/store/goals/GoalsStorage';
import { X } from '@phosphor-icons/react';
import * as S from './TransactionGraphsStyles';
import Chart from 'react-apexcharts';

type Goals = {
   name: string;
   number: number;
   expectated_expense: string;
   expectated_revenue: string;
};

export type DataItem = {
   month: string;
   minimalCurrentValue: any;
   majorCurrentValue: any;
   goals: Goals | undefined;
};

export type DataResponse = Array<DataItem>;

export interface HandleDataProps {
   FormattedGoalsItems(item: DataItem): any;
   sut: DataResponse;
   options: 'majorCurrentValue' | 'goals' | 'month' | 'minimalCurrentValue';
}

function handleData({ FormattedGoalsItems, options, sut }: HandleDataProps) {
   return sut.map((item) => {
      const goalsConfig = FormattedGoalsItems(item)?.map((i: any) => {
         return { ...i, strokeColor: 'purple' };
      });

      return {
         x: item.month,
         y: item[options],
         goals: goalsConfig,
      };
   });
}

function TransactionGraphs() {
   const { transaction } = useTransactionContext();
   const [data, setDate] = useState<DataResponse>([]);
   const [showNotFoundPaga, setShowNotFoundPaga] = useState<boolean>(false);

   const { currentTransactionType } = useTransactionContext();

   const [muOptions, setMuOptions] = useState<
      ApexCharts.ApexOptions | undefined
   >(undefined);
   const {
      state: { goals },
      actions: { list: ListGoals },
   } = GoalsStorage();

   const GetTransactionType = useCallback(
      (type: 'expense' | 'revenue') => {
         const TransactionType = transaction?.transactions
            .filter((item) => {
               const currentYear = new Date().getFullYear();
               const getCorrespondeDateType =
                  type === 'expense' ? item.due_date : item.filingDate;
               const currentYearOfTransaction = new Date(
                  getCorrespondeDateType as string
               ).getFullYear();

               return (
                  item.type === type && currentYearOfTransaction === currentYear
               );
            })
            .sort((a, b) => {
               let typeChoses = {} as any;

               if (type === 'expense') {
                  typeChoses = {
                     a: a.due_date,
                     b: b.due_date,
                  };
               } else if (type == 'revenue') {
                  typeChoses = {
                     a: a.filingDate,
                     b: b.filingDate,
                  };
               }

               const monthA = new Date(typeChoses.a as string).getMonth();
               const monthB = new Date(typeChoses.b as string).getMonth();
               return monthA - monthB;
            });

         return TransactionType;
      },
      [transaction?.transactions]
   );

   const GroupedByMonth = useCallback(
      (
         transactions: Transaction[] | undefined,
         type: 'expense' | 'revenue'
      ) => {
         const groupByMount = transactions?.reduce((storage, crr) => {
            const getCorrespondeDateType =
               type === 'expense' ? crr.due_date : crr.filingDate;

            const month = getCorrespondeDateType?.substr(0, 7) as string;

            if (!storage[month]) {
               storage[month] = [];
            }
            storage[month].push(crr);

            return storage;
         }, {} as { [key: string]: any });

         return groupByMount;
      },
      []
   );

   const GraphConfiguration = useCallback(async () => {
      const Months = [] as {
         name: string;
         ref: string;
      }[];

      for (let i = 0; i < 12; i++) {
         const ref = i === 0 ? '12' : i < 10 ? `0${i}` : i.toString();
         const name = new Date(2000, i - 1, 1).toLocaleString('default', {
            month: 'short',
         });

         Months.push({ name, ref });
      }

      await ListGoals();

      const sut = data.reduce((storage, acc) => {
         const currentMonth = Number(
            acc['month'].slice(-2).replace('0', '').trim()
         );

         const currentMonthGoals = goals?.MonthFormatted?.find(
            (month) => month.number === currentMonth
         );

         acc = {
            ...acc,
            goals: currentMonthGoals || undefined,
         };

         storage.push(acc);

         return storage;
      }, [] as DataResponse);

      let TransactionTypeName: 'Despesa' | 'Receita' = 'Receita';

      if (Number(sut[0]?.majorCurrentValue) < 0) {
         TransactionTypeName = 'Despesa';
      }

      function FormattedGoalsItems(item: DataItem): any {
         let goalsConfig: any;

         if (item.goals !== undefined) {
            const value =
               item.minimalCurrentValue < 0
                  ? item.goals.expectated_expense
                  : item.goals.expectated_revenue;

            goalsConfig = [
               {
                  name: 'Objetivo ' + ' ( ' + item.goals?.name + ' ) ',
                  value,
                  strokeWidth: 10,
                  strokeHeight: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0',
               },
            ];
         }

         return goalsConfig;
      }

      if (sut.length === 0) {
         setShowNotFoundPaga(true);
      } else {
         setShowNotFoundPaga(false);
      }

      const apexSettings = ApexConfigTransactionGraph({
         data,
         FormattedGoalsItems,
         handleData,
         Months,
         sut,
         TransactionTypeName,
      }) as ApexCharts.ApexOptions | undefined;

      setMuOptions(apexSettings);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ListGoals, data]);

   useEffect(() => {
      GraphConfiguration();
   }, [GraphConfiguration]);

   useEffect(() => {
      const TransactionsResult = GetTransactionType(currentTransactionType);

      const groupedByMonthExpense = GroupedByMonth(
         TransactionsResult,
         currentTransactionType
      );

      const result = {} as { [key: string]: any };

      for (const month in groupedByMonthExpense) {
         const group = groupedByMonthExpense[month];

         result[month] = {
            max: -Infinity,
            min: Infinity,
            instalment: false,
            gols: Infinity,
         };

         for (const item of group) {
            let value = parseFloat(item.value);
            if (isNaN(value)) continue;

            if (item.installments !== 0 && item.installments !== null) {
               result[month].instalment = true;
               value = value / item.installments;
               value = Number(value.toFixed(2));
            }

            result[month].max = Math.max(result[month].max, value);
            result[month].min = Math.min(result[month].min, value);
         }
      }

      const data = Object.keys(result).map((month) => ({
         month,
         minimalCurrentValue: result[month].max,
         majorCurrentValue: result[month].min,
         goals: undefined,
      }));

      setDate(data);
   }, [currentTransactionType, GroupedByMonth, GetTransactionType]);

   return (
      <S.WrapperMain>
         {muOptions && (
            <>
               <S.ChartTittle type={currentTransactionType}>
                  <span>Receita</span>/<span>Despesas</span>
               </S.ChartTittle>

               {showNotFoundPaga ? (
                  <S.ChartSkeleton>
                     <S.ChartSkeletonH1>
                        {currentTransactionType === 'expense'
                           ? `Nenhuma despesa encontrada`
                           : `Nenhuma receita encontrada!`}
                     </S.ChartSkeletonH1>
                     <div
                        style={{
                           color: 'black',
                           backgroundColor: '#a48027',
                           borderRadius: '50%',
                        }}
                     >
                        <X size={200} />
                     </div>
                  </S.ChartSkeleton>
               ) : (
                  <Chart
                     options={muOptions}
                     series={muOptions?.series}
                     type="bar"
                     height="88%"
                     width={'100%'}
                  />
               )}
            </>
         )}
      </S.WrapperMain>
   );
}

export default memo(TransactionGraphs);
