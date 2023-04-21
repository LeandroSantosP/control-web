import { z } from 'zod';
import { useState, useEffect, useCallback, useRef } from 'react';
import { FormatCurense } from '../../../shared/helpers/FormatCurense';
import Chart from 'react-apexcharts';
import { CaretDown, CaretRight, Trash, X } from '@phosphor-icons/react';

import * as S from './GoalTransactionModalStyles';
import { useGoalsStorage } from '../../../shared/store';
import { CreateNewGoalForm } from '../CreateNewGoalForm/CreateNewGoalForm';
import { DeleteNewGoalForm } from '../DeleteGoalsForm/DeleteGoalsForm';
import { ValidMonths } from '../../../shared/myTypes/ValidMonths';
import { HandleDeleteAllGoals } from '../../../shared/helpers/DeleteAllGoals';

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
      state: { goals, isLoading },
      actions: { remove },
   } = useGoalsStorage();

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

   useEffect(() => {
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
         },

         stroke: {
            curve: 'smooth',
            colors: ['#fff'],
         },
         xaxis: {
            categories: monthNames.map((month) => month || '0'),
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
               data: goalsData().map((goal) => {
                  return Number(goal.expectated_expense);
               }),
            },
            {
               name: 'Meta de Receita',
               data: goalsData().map((goal) => {
                  return Number(goal.expectated_revenue);
               }),
            },
         ],
      }));
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
                  visible={'visible'}
                  onClick={() => HandleDeleteAllGoals(remove, goals)}
                  bottom="10.5rem"
               >
                  <Trash size={25} />
               </S.ButtonCreateGoals>
               {showDeleteGoals && <DeleteNewGoalForm />}
               {showCreateGoals && (
                  <CreateNewGoalForm {...CreateNewGoalsProps} />
               )}
               {isLoading ? (
                  <S.GoalsGraphsSkeleton />
               ) : (
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
               )}
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
