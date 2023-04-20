import { z } from 'zod';
import { useState, useEffect } from 'react';
import { FormatCurense } from '../../../shared/helpers/FormatCurense';
import Chart from 'react-apexcharts';
import { CaretDown, CaretRight, Target, X } from '@phosphor-icons/react';

import * as S from './GoalTransactionModalStyles';
import { useGoalsStorage } from '../../../shared/store';
import { CreateNewGoalForm } from '../CreateNewGoalForm/CreateNewGoalForm';
import { DeleteNewGoalForm } from '../DeleteGoalsForm/DeleteGoalsForm';
import { ValidMonths } from '../../../shared/myTypes/ValidMonths';

const createGoalsSchema = z.object({
   dataForUpdate: z
      .array(
         z.object({
            month: z
               .string()
               .nonempty('Campo Obrigatório')
               .refine((month: any) => {
                  if (ValidMonths[month] === undefined) {
                     return false;
                  }

                  return true;
               }, `Mes Invalido,Exe:..[02,03...12]`),
            expectated_expense: z.string().nonempty('Campo Obrigatário'),

            expectated_revenue: z.string().nonempty('Campo Obrigatário'),
         })
      )
      .nonempty(),
});

export type createGoalsData = z.infer<typeof createGoalsSchema>;
const monthNames = [
   'Janeiro',
   'Fevereiro',
   'Março',
   'Abril',
   'Maio',
   'Junho',
   'Julho',
   'Agosto',
   'Setembro',
   'Outubro',
   'Novembro',
   'Dezembro',
];

export const GoalsTransactionModal = () => {
   const [charOptions, setCharOptions] = useState<
      ApexCharts.ApexOptions | undefined
   >({});
   const {
      state: { goals },
   } = useGoalsStorage();

   useEffect(() => {
      const goalsData = monthNames.map((monthName) => {
         const dataForMonth = goals?.MonthFormatted?.find(
            (d) => d.name === monthName
         );

         if (dataForMonth) {
            return dataForMonth;
         } else {
            return {
               name: monthName,
               expectated_expense: '0',
               expectated_revenue: '0',
            };
         }
      });

      setCharOptions(() => ({
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
         plotOptions: {
            area: {
               fillTo: 'end',
            },
         },
         colors: ['#B01E68', '#3D5656'],
         chart: {
            type: 'area',
            animations: {
               enabled: true,
               easing: 'easeinout',

               speed: 800,
               animateGradually: {
                  enabled: true,
                  delay: 150,
               },
            },
         },

         stroke: {
            curve: 'smooth',
            type: 'gradient',
            colors: ['#fff'],
         },
         xaxis: {
            categories: monthNames.map((month) => month),
         },

         yaxis: {
            labels: {
               formatter: function (value) {
                  const FormattedToMoney = FormatCurense(Number(value));

                  return `${FormattedToMoney}`;
               },
               align: 'center',
            },
         },

         series: [
            {
               name: 'Meta de Despesas',
               data: goalsData.map((goal) => {
                  return Number(goal.expectated_expense);
               }),
            },
            {
               name: 'Meta de Receita',
               data: goalsData.map((goal) => {
                  return Number(goal.expectated_revenue);
               }),
            },
         ],
      }));
   }, [goals, goals?.MonthFormatted]);

   const [showCreateGoals, setShowCreateGoals] = useState(false);

   const [showDeleteGoals, setShowDeleteGoals] = useState(false);

   const handleClickCreateGoal = () => {
      setShowCreateGoals((prev) => !prev);
   };
   const handleClickDeleteGoal = () => {
      setShowDeleteGoals((prev) => !prev);
   };

   // form

   const CreateNewGoalsProps = {
      showCreateGoals,
   };

   return (
      <S.DialogRoot>
         <S.DialogTrigger>
            <Target />
         </S.DialogTrigger>
         <S.DialogPortal>
            <S.DialogOverlay />
            <S.DialogContent>
               {' '}
               <S.DialogTitle>Meta (POR MES)</S.DialogTitle>
               <S.DialogDescription as="div">
                  Trace metas financeiras e alcance a estabilidade financeira
                  com sucesso!
               </S.DialogDescription>
               <S.ButtonCreateGoals
                  visible={'visible'}
                  bottom="8rem"
                  onClick={handleClickDeleteGoal}
               >
                  {showDeleteGoals ? (
                     <CaretRight size={30} />
                  ) : (
                     <CaretDown size={30} />
                  )}
               </S.ButtonCreateGoals>
               <S.ButtonCreateGoals
                  visible={'visible'}
                  onClick={handleClickCreateGoal}
               >
                  {showCreateGoals ? (
                     <CaretRight size={30} />
                  ) : (
                     <CaretDown size={30} />
                  )}
               </S.ButtonCreateGoals>
               {showDeleteGoals && <DeleteNewGoalForm />}
               {showCreateGoals && (
                  <CreateNewGoalForm {...CreateNewGoalsProps} />
               )}
               <S.GoalsGraphs height="100%">
                  {charOptions?.series && (
                     <Chart
                        options={charOptions}
                        series={charOptions?.series}
                        height="480px"
                        width={1000}
                        type={charOptions?.chart?.type as any}
                     />
                  )}
               </S.GoalsGraphs>
               <S.DialogClose asChild>
                  <button>
                     <X />
                  </button>
               </S.DialogClose>
            </S.DialogContent>
         </S.DialogPortal>
      </S.DialogRoot>
   );
};
