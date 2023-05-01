import { z } from 'zod';
import Chart from 'react-apexcharts';
import { useState, useEffect, useCallback } from 'react';
import { CaretDown, CaretRight, Trash, X } from '@phosphor-icons/react';

import * as S from './GoalTransactionModalStyles';
import { GoalsStorage } from '../../../shared/store';
import { ValidMonths } from '../../../shared/myTypes/ValidMonths';
import { FormatCurense } from '../../../shared/helpers/FormatCurense';
import { DeleteNewGoalForm } from '../DeleteGoalsForm/DeleteGoalsForm';
import { CreateNewGoalForm } from '../CreateNewGoalForm/CreateNewGoalForm';
import { HandleDeleteAllGoals } from '../../../shared/helpers/DeleteAllGoals';
import { useFlashMessageContext } from '../../../shared/contexts';

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

export const GoalsTransactionModal = ({
   TargetButton,
}: {
   TargetButton: ({ children }: { children: React.ReactNode }) => JSX.Element;
}) => {
   const {
      state: { goals },
      actions: { remove },
   } = GoalsStorage();
   const { handleShowingFlashMessage } = useFlashMessageContext();

   const goalsData = useCallback(() => {
      return monthNames.map((monthName) => {
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
   }, [goals]);

   const [charOptions, setCharOptions] = useState<
      ApexCharts.ApexOptions | undefined
   >(undefined);

   const getCharOptions = (
      goalsData: any,
      monthNames: string[]
   ): ApexCharts.ApexOptions | undefined => {
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
            formatter: (val, opt) => {
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
            onClick: function (e) {
               // do something on marker click
               console.log('ok');
            },
            onDblClick: function (e) {
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
   };

   useEffect(() => {
      setCharOptions(getCharOptions(goalsData(), monthNames));
   }, [goalsData]);

   const [showCreateGoals, setShowCreateGoals] = useState(false);

   const [showDeleteGoals, setShowDeleteGoals] = useState(false);

   const handleClickCreateGoal = () => {
      setShowCreateGoals((prev) => {
         if (showDeleteGoals) {
            setShowDeleteGoals(false);
         }
         return !prev;
      });
   };
   const handleClickDeleteGoal = () => {
      setShowDeleteGoals((prev) => {
         if (showCreateGoals) {
            setShowCreateGoals(false);
         }
         return !prev;
      });
   };

   const CreateNewGoalsProps = {
      showCreateGoals,
   };

   /* isLoading is cause a error Fixe it. */

   return (
      <S.DialogRoot>
         <TargetButton>Metas</TargetButton>
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
               <S.ButtonCreateGoals
                  bg="rgba(255, 0, 0, 0.39)"
                  visible={'visible'}
                  onClick={() =>
                     HandleDeleteAllGoals(
                        remove,
                        goals,
                        handleShowingFlashMessage
                     )
                  }
                  bottom="10.5rem"
               >
                  <Trash size={25} />
               </S.ButtonCreateGoals>
               {showDeleteGoals && <DeleteNewGoalForm />}
               {showCreateGoals && (
                  <CreateNewGoalForm {...CreateNewGoalsProps} />
               )}
               <S.GoalsGraphs height="100%">
                  {charOptions && charOptions?.series && (
                     <Chart
                        options={charOptions}
                        series={charOptions?.series}
                        height="480px"
                        width={1000}
                        type={'area'}
                     />
                  )}
               </S.GoalsGraphs>
               <S.DialogClose asChild>
                  <X size={20} />
               </S.DialogClose>
            </S.DialogContent>
         </S.DialogPortal>
      </S.DialogRoot>
   );
};
