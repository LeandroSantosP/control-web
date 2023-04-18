import * as S from './TransactionGraphsStyles';
import { memo, useCallback, useEffect, useState } from 'react';
import { ArrowsCounterClockwise } from '@phosphor-icons/react';
import { Transaction, useTransactionContext } from '../../../shared/contexts';
import { toMoney } from 'vanilla-masker';
import { FormatCurense } from '../../../shared/helpers/FormatCurense';
import { useGoalsStorage } from '../../../shared/store/goals/GoalsStorage';

type Goals = {
   name: string;
   number: number;
   expectated_expense: string;
   expectated_revenue: string;
};

type DataItem = {
   month: string;
   minimalCurrentValue: any;
   majorCurrentValue: any;
   goals: Goals | undefined;
};

type DataResponse = Array<DataItem>;

function TransactionGraphs() {
   const {
      state: { goals },
      actions: { list: ListGoals },
   } = useGoalsStorage();
   const { transaction } = useTransactionContext();
   const [data, setDate] = useState<DataResponse>([]);

   const [currentTransactionType, setCurrentTransactionType] = useState<
      'revenue' | 'expense'
   >('expense');
   const [muOptions, setMuOptions] = useState<
      ApexCharts.ApexOptions | undefined
   >(undefined);

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
         const ref = i < 10 ? `0${i}` : i.toString();
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

      let TransactionTypeName: 'Despesas' | 'Receita' = 'Receita';

      if (Number(sut[0]?.majorCurrentValue) < 0) {
         TransactionTypeName = 'Despesas';
      }

      function FormattedGoalsItems(item: DataItem) {
         let goalsConfig: any;

         if (item.goals !== undefined) {
            const value =
               item.minimalCurrentValue < 0
                  ? item.goals.expectated_expense
                  : item.goals.expectated_revenue;

            goalsConfig = [
               {
                  name: 'Valor esperado para o mes de ' + item.goals?.name,
                  value: value,
                  strokeWidth: 10,
                  strokeHeight: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0',
               },
            ];
         }

         return goalsConfig;
      }

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
         yaxis: {
            labels: {
               formatter: (val: any) => {
                  const res = FormatCurense(val as number);

                  if ((typeof val[0] as any) === 'string') {
                     return val;
                  }

                  return (
                     `${res.includes('-') ? '-' : ''} ` +
                     toMoney(res, {
                        unit: 'RS',
                     })
                  );
               },
               align: 'center',
            },
         },
         dataLabels: {
            formatter: (val, opt) => {
               const goals =
                  opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                     .goals;

               if (goals && goals.length) {
                  return `R$ ${val}`;
               }
               return `R$ ${val}`;
            },
         },
         series: [
            {
               name: `Menores ${TransactionTypeName} (Do MES)`,
               color: 'rgba(176, 159, 80, 0.66)',

               data: sut.map((item) => {
                  const goalsConfig = FormattedGoalsItems(item);

                  return {
                     x: '2013',
                     y: item.minimalCurrentValue,
                     goals: goalsConfig,
                  };
               }),
            },
            {
               name: `Maiores ${TransactionTypeName} ( MES)`,
               color: 'rgba(80, 176, 149, 0.66)',
               data: sut.map((item) => {
                  const goalsConfig = FormattedGoalsItems(item);

                  return {
                     x: '2013',
                     y: item.majorCurrentValue,
                     goals: goalsConfig,
                  };
               }),
            },
         ],
      });
   }, [data]);

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
            </>
         )}
      </S.WrapperMain>
   );
}

export default memo(TransactionGraphs);
