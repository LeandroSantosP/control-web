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
}: ApexConfigTransactionGraphInput) {
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
            horizontal: true,
            borderRadius: 3,

            dataLabels: {
               position: 'top',
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
            align: 'center',
         },
      },
      dataLabels: {
         formatter: (val: string | number | number[]) => {
            const result = FormatCurense(Number(val));

            return `${result}`;
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
         colors: ['#e61239', '#12e864'],
         gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
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
      colors: ['#B01E68', '#3D5656'],
      chart: {
         type: 'area',
         stacked: true,
      },
      xaxis: {
         categories: monthNames.map((month) => month || '0'),
      },
      markers: {
         size: 20,
         colors: undefined,
         strokeColors: '#1be3c5',

         strokeOpacity: 0.9,
         strokeDashArray: 0,
         fillOpacity: 1,
         shape: 'circle',
         radius: 2,
         onClick: function () {
            // do something on marker click
            console.log('ok');
         },
         onDblClick: function () {
            // do something on marker click
            console.log('ok');
         },
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
            name: 'Meta de Despesas',
            data: goalsData.map((goal: any) => {
               return Number(goal.expectated_expense);
            }),
         },
         {
            name: 'Meta de Receita',
            data: goalsData.map((goal: any) => {
               return Number(goal.expectated_revenue);
            }),
         },
      ],
   };
}
