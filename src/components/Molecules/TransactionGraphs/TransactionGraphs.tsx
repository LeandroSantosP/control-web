import { useCallback, useEffect, useState } from 'react';
import { ArrowsCounterClockwise } from '@phosphor-icons/react';
import { Transaction, useTransactionContext } from '../../../shared/contexts';
import * as S from './TransactionGraphsStyles';
import { GraphsInfos } from '../../atoms/GraphsInfos/GraphsInfos';

export const TransactionGraphs = () => {
   const [showInfo, setShowInfo] = useState(false);
   const [currentTransactionType, setCurrentTransactionType] = useState<
      'revenue' | 'expense'
   >('expense');
   const { transaction } = useTransactionContext();
   const [muOptions, setMuOptions] = useState<
      ApexCharts.ApexOptions | undefined
   >(undefined);
   console.log(transaction);

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
            result[month].gols = 21;
         }
      }

      const data = Object.keys(result).map((month) => ({
         month,
         minimalCurrentValue: result[month].max,
         majorCurrentValue: result[month].min,
         gols: result[month].gols,
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

      /*
         Uma Rota no backend onde eu tenho que mandar o id do user o mes que onde a ele deseja adicionar uma meta(Revenue Expense) /

      */

      setMuOptions({
         legend: {
            position: 'top',
         },
         chart: {
            zoom: {
               enabled: true,
               type: 'x',
               autoScaleYaxis: false,
               zoomedArea: {
                  fill: {
                     color: '#90CAF9',
                     opacity: 0.4,
                  },
                  stroke: {
                     color: '#0D47A1',
                     opacity: 0.4,
                     width: 1,
                  },
               },
            },
         },
         tooltip: {
            enabled: true,
            fillSeriesColor: true,
            theme: 'dark',
         },

         plotOptions: {
            bar: {
               horizontal: true,
               borderRadiusApplication: 'around',
               borderRadiusWhenStacked: 'last',
               borderRadius: 2,
               dataLabels: {
                  position: 'top',
                  orientation: 'horizontal',
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
         },

         series: [
            {
               name: `Menores Despesas (Por MES)`,
               color: 'rgba(176, 159, 80, 0.66)',

               data: data.map((item) => {
                  return {
                     x: '2013',
                     y: item.minimalCurrentValue,
                     goals: [
                        {
                           name: 'Expected',
                           value: item.gols,
                           strokeWidth: 10,
                           strokeHeight: 0,
                           strokeLineCap: 'round',
                           strokeColor: '#775DD0',
                        },
                     ],
                  };
               }),
            },
            {
               name: 'Maiores Despesas (Por MES)',
               color: 'rgba(80, 176, 149, 0.66)',
               data: data.map((item) => {
                  return {
                     x: '2013',
                     y: item.majorCurrentValue,
                     goals: [
                        {
                           name: 'Expected',
                           value: item.gols,
                           strokeWidth: 10,
                           strokeHeight: 0,
                           strokeLineCap: 'round',
                           strokeColor: '#775DD0',
                        },
                     ],
                  };
               }),
            },
         ],
      });
   }, [currentTransactionType, GroupedByMonth, GetTransactionType]);

   return (
      <S.WrapperMain>
         {' '}
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
         <S.InfosButton
            size={15}
            onClick={() => setShowInfo((prev) => !prev)}
         />
         {showInfo && <GraphsInfos />}
         {muOptions && (
            <>
               <S.ChartTittle type={currentTransactionType}>
                  <span>Receita</span>/<span>Despesas</span>
               </S.ChartTittle>
               <S.ChartCustoms
                  options={muOptions}
                  series={muOptions?.series}
                  height="260px"
                  type="bar"
               />
               <S.ChartTittle type={currentTransactionType}>
                  <span>Receita</span>/<span>Despesas</span>
               </S.ChartTittle>
               <S.ChartCustoms
                  options={muOptions}
                  series={muOptions?.series}
                  height="200px"
                  type="bar"
               />
            </>
         )}
      </S.WrapperMain>
   );
};
