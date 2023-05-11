import { toMoney } from 'vanilla-masker';
import {
   DataItem,
   DataResponse,
   HandleDataProps,
} from '../../components/Molecules/TransactionGraphs/TransactionGraphs';
import { FormatCurense } from './FormatCurense';

interface ApexConfigTransactionGraphInput {
   data: DataResponse;
   Months: {
      name: string;
      ref: string;
   }[];
   FormattedGoalsItems(item: DataItem): any;
   TransactionTypeName: string;
   handleData(props: HandleDataProps): any;
   sut: DataResponse;
}

export function ApexConfigTransactionGraph({
   data,
   Months,
   FormattedGoalsItems,
   TransactionTypeName,
   handleData,
   sut,
}: ApexConfigTransactionGraphInput): ApexCharts.ApexOptions {
   return {
      legend: {
         position: 'top',
      },
      colors: ['rgba(80, 176, 149, 0.66)', 'rgba(176, 159, 80, 0.66)'],
      tooltip: {
         enabled: true,
         fillSeriesColor: true,
         theme: 'dark',
      },
      plotOptions: {
         bar: {
            horizontal: false,
            barHeight: '10%',
            columnWidth: '90%',
            dataLabels: {
               position: 'top',
               total: {
                  enabled: true,
               },
               orientation: 'horizontal',
            },
         },
      },
      chart: {
         type: 'area',
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
            formatter: function (value: any) {
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
            padding: 10,
         },
      },
      dataLabels: {
         formatter: (val: string | number | number[]) => {
            const result = FormatCurense(Number(val));

            return `${result}`;
         },
         style: {
            fontSize: '10px',
         },
      },
      series: [
         {
            name: `Maior ${TransactionTypeName} ( Do MES )`,
            data: handleData({
               FormattedGoalsItems,
               options: 'minimalCurrentValue',
               sut,
            }),
         },
         {
            name: `Menor ${TransactionTypeName} ( Do MES )`,
            data: handleData({
               FormattedGoalsItems,
               options: 'majorCurrentValue',
               sut,
            }),
         },
      ],
   };
}

interface ApexConfigGoalsGraphInput {
   monthNames: string[];
   goalsData: any;
}

export function ApexConfigGoalsGraph({
   monthNames,
   goalsData,
}: ApexConfigGoalsGraphInput) {
   return {
      tooltip: {
         enabled: true,
         fillSeriesColor: true,
         theme: 'dark',
      },
      fill: {
         type: 'gradient',
         colors: ['#e61239', '#12e864', '#33cc38', '#CC3333'],
         gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0,
         },
      },
      stroke: {
         show: true,
         curve: 'smooth',
         lineCap: 'butt',
         width: 2,
         dashArray: 0,
      },

      plotOptions: {
         area: {
            fillTo: 'end',
         },
      },
      dataLabels: {
         formatter: (val: string | number | number[]) => {
            const result = FormatCurense(Number(val));

            return `${result}`;
         },
      },
      colors: ['#B01E68', '#3D5656', '#33cc38', '#CC3333'],
      chart: {
         type: 'area',
         stacked: true,
      },
      xaxis: {
         categories: monthNames.map((month) => month || '0'),
      },
      markers: {
         size: 17,
         colors: undefined,
         strokeColors: '#1be3c5',
         strokeOpacity: 0.9,
         strokeDashArray: 0,
         fillOpacity: 1,
         shape: 'circle',
         showNullDataPoints: true,
         hover: {
            size: undefined,
            sizeOffset: 4,
         },
      },
      yaxis: {
         labels: {
            formatter: function (value: number) {
               const FormattedToMoney = FormatCurense(Number(value));
               return `${FormattedToMoney}`;
            },
            align: 'center',
         },
      },
      series: [
         {
            name: 'Meta de Receita',
            data: goalsData.map((goal: any) => {
               return Number(goal.expectated_revenue);
            }),
         },
         {
            name: 'Meta de Despesas',
            data: goalsData.map((goal: any) => {
               return Number(goal.expectated_expense);
            }),
         },
         {
            name: 'Receita Atua',
            data: goalsData.map((goal: any) => {
               return Number(goal.userCurrentValue?.revenueTotal);
            }),
         },
         {
            name: 'Despesa Atua',
            data: goalsData.map((goal: any) => {
               return Number(goal.userCurrentValue?.expenseTotal);
            }),
         },
      ],
   };
}
