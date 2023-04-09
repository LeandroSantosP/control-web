import { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTransactionContext } from '../../../shared/contexts';
import * as S from './TransactionGraphsStyles';

export const TransactionGraphs = () => {
   const { transaction } = useTransactionContext();

   const expenseTransactions = transaction?.transactions
      .filter((item) => {
         const currentYear = new Date(item.due_date as string).getFullYear();
         return item.type === 'expense' && currentYear === 2023;
      })
      .sort((a, b) => {
         const monthA_expense = new Date(a.due_date as string).getMonth();
         const monthB_expense = new Date(b.due_date as string).getMonth();

         return monthA_expense - monthB_expense;
      });

   const groupedByMonth = expenseTransactions?.reduce((storage, curr) => {
      const month = curr.due_date?.substr(0, 7) as string;

      if (!storage[month]) {
         storage[month] = [];
      }
      storage[month].push(curr);

      return storage;
   }, {} as { [key: string]: any[] });

   const result = {} as { [key: string]: any };

   for (const month in groupedByMonth) {
      const group = groupedByMonth[month];

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
      minimalExpense: result[month].max,
      majorExpense: result[month].min,
   }));

   // const test = expenseTransactions?.reduce(
   //    (storage, crr) => {
   //       const value = parseFloat(crr.value);

   //       if (!isNaN(value) && value > storage.highestExpense.value) {
   //          storage.highestExpense = crr as any;
   //       }

   //       if (!isNaN(value) && value < storage.minorExpense.value) {
   //          storage.minorExpense = crr as any;
   //       }

   //       return storage;
   //    },
   //    {
   //       highestExpense: { value: -Infinity },
   //       minorExpense: { value: Infinity },
   //    }
   // );

   const [muOptions, setMuOptions] = useState({
      options: {
         chart: {
            id: 'basic-bar',
         },
         plotOptions: {
            bar: {
               borderRadius: 3,
               colors: {
                  ranges: [
                     {
                        from: 1,
                        to: 3,
                        color: 'red',
                     },
                  ],
                  backgroundBarColors: [],
                  backgroundBarOpacity: 1,
                  backgroundBarRadius: 0,
               },
            },
         },
         xaxis: {
            categories: [
               'Jan',
               'Fev',
               'mar',
               'abr',
               'mai',
               'jun',
               'jul',
               'ago',
               'set',
               'out',
               'nov',
               'dez',
            ],
         },

         series: [
            {
               name: 'Maiores Despesas',
               data: [23, 40, 30, 2, 23, 23, 88, 130],
            },
            {
               name: 'Menores Despesas',
               data: [4, 2, 230],
            },
         ],
      },
   });

   return (
      <S.WrapperMain>
         <Chart
            options={muOptions.options}
            series={muOptions.options.series}
            type="bar"
            width={500}
         />
      </S.WrapperMain>
   );
};
