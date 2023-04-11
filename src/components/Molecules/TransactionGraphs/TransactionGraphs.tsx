import { useCallback, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ArrowsCounterClockwise } from '@phosphor-icons/react';
import { Transaction, useTransactionContext } from '../../../shared/contexts';
import * as S from './TransactionGraphsStyles';
import { toMoney } from 'vanilla-masker';

export const TransactionGraphs = () => {
   const [currentTransactionType, setCurrentTransactionType] = useState<
      'revenue' | 'expense'
   >('revenue');
   const { transaction } = useTransactionContext();
   const [muOptions, setMuOptions] = useState<
      ApexCharts.ApexOptions | undefined
   >(undefined);

   const GetTransactionType = useCallback(
      (type: 'expense' | 'revenue') => {
         const TransactionType = transaction?.transactions
            .filter((item) => {
               const getCorrespondeDateType =
                  type === 'expense' ? item.due_date : item.filingDate;
               const currentYear = new Date(
                  getCorrespondeDateType as string
               ).getFullYear();

               return item.type === type && currentYear === 2023;
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
         };

         for (const item of group) {
            const value = parseFloat(item.value);
            if (isNaN(value)) continue;
            result[month].max = Math.max(result[month].max, value);
            result[month].min = Math.min(result[month].min, value);
         }
      }

      const data = Object.keys(result).map((month) => ({
         month,
         minimalCurrentValue: result[month].max,
         majorCurrentValue: result[month].min,
      }));

      const Months = [
         {
            name: 'Jan',
            ref: '01',
         },
         {
            name: 'Fev',
            ref: '02',
         },
         {
            name: 'mar',
            ref: '03',
         },
         {
            name: 'abr',
            ref: '04',
         },
         {
            name: 'mai',
            ref: '05',
         },
         {
            name: 'jun',
            ref: '06',
         },
         {
            name: 'jul',
            ref: '07',
         },
         {
            name: 'ago',
            ref: '08',
         },
         {
            name: 'set',
            ref: '09',
         },
         {
            name: 'out',
            ref: '10',
         },
         {
            name: 'nov',
            ref: '11',
         },
         {
            name: 'dez',
            ref: '12',
         },
      ];

      setMuOptions({
         legend: {
            position: 'top',
         },
         tooltip: {
            enabled: true,
            fillSeriesColor: true,
            theme: 'dark',
         },
         plotOptions: {
            bar: {
               borderRadiusApplication: 'around',
               borderRadiusWhenStacked: 'last',
               dataLabels: {
                  position: 'top',
                  orientation: 'horizontal',
                  total: {
                     enabled: true,
                     style: {
                        fontSize: '1px',
                     },
                  },
               },
               columnWidth: '40px',
            },
         },
         xaxis: {
            categories: data.map((item) => {
               const formattedMonth = item.month.slice(-2);

               const response = Months.map((item) => {
                  if (item.ref.includes(formattedMonth)) {
                     return item.name;
                  }
                  return;
               }).filter((i) => i !== undefined);
               return response;
            }),
            labels: {
               formatter: function (value) {
                  return value;
               },
            },
            type: 'category',
         },

         series: [
            {
               name: `Menores Despesas (Por MES)`,
               color: 'rgba(176, 159, 80, 0.66)',
               data: data.map((item) => {
                  return item.majorCurrentValue;
               }),
            },
            {
               name: 'Maiores Despesas (Por MES)',

               color: 'rgba(80, 176, 149, 0.66)',
               data: data?.map((item) => {
                  return item.minimalCurrentValue;
               }),
            },
         ],
      });
   }, [currentTransactionType, GroupedByMonth, GetTransactionType]);

   return (
      <S.WrapperMain>
         <S.ToggleButton
            onClick={() =>
               setCurrentTransactionType((prev) => {
                  if (prev === 'expense') {
                     return 'revenue';
                  }
                  return 'expense';
               })
            }
         >
            <ArrowsCounterClockwise size={20} />
            {currentTransactionType === 'expense' ? 'Receitas' : 'Dispensas'}
         </S.ToggleButton>
         {muOptions && (
            <Chart
               options={muOptions}
               series={muOptions?.series}
               width={500}
               type="bar"
            />
         )}
      </S.WrapperMain>
   );
};
