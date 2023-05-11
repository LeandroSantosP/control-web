import { z } from 'zod';
import Chart from 'react-apexcharts';
import { useState, useEffect, useMemo } from 'react';
import { ApexConfigGoalsGraph } from '../../../shared/helpers/ApexConfig';
import { CaretDown, CaretRight, Trash, X } from '@phosphor-icons/react';

import * as S from './GoalTransactionModalStyles';
import { GoalsStorage } from '../../../shared/store';
import { ValidMonths } from '../../../shared/myTypes/ValidMonths';
import { DeleteNewGoalForm } from '../DeleteGoalsForm/DeleteGoalsForm';
import { CreateNewGoalForm } from '../CreateNewGoalForm/CreateNewGoalForm';
import { HandleDeleteAllGoals } from '../../../shared/helpers/DeleteAllGoals';
import {
   useFlashMessageContext,
   useTransactionContext,
} from '../../../shared/contexts';

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
   const { transaction } = useTransactionContext();

   const { handleShowingFlashMessage } = useFlashMessageContext();

   const goalsData = useMemo(() => {
      const GoalsFormateWithTotalCurrency = goals?.MonthFormatted.map(
         (item) => {
            const goalMOnth = item.name;

            const userCurrentValue = transaction?.transactions?.reduce(
               (storage, current) => {
                  const currentMonth =
                     current.type === 'revenue'
                        ? current.filingDate?.split('-')[1]
                        : current.due_date?.split('-')[1];

                  if (!currentMonth) {
                     return storage;
                  }

                  if (goalMOnth === ValidMonths[currentMonth]) {
                     const expenseTotal =
                        current.type === 'expense'
                           ? storage.expenseTotal + Number(current.value)
                           : storage.expenseTotal;

                     const revenueTotal =
                        current.type === 'revenue'
                           ? storage.revenueTotal + Number(current.value)
                           : storage.revenueTotal;

                     return {
                        ...storage,
                        expenseTotal,
                        revenueTotal,
                        currentMonth: ValidMonths[currentMonth],
                     };
                  }

                  return storage;
               },
               { currentMonth: '', expenseTotal: 0, revenueTotal: 0 }
            );

            return { ...item, userCurrentValue };
         }
      );

      return monthNames.map((monthName) => {
         const dataForMonth = GoalsFormateWithTotalCurrency?.find(
            (d) => d.name === monthName
         );

         if (dataForMonth) {
            return dataForMonth;
         } else {
            return {
               name: monthName,
               expectated_expense: '0',
               expectated_revenue: '0',
               userCurrentValue: {
                  currentMonth: '',
                  expenseTotal: 0,
                  revenueTotal: 0,
               },
            };
         }
      });
   }, [goals?.MonthFormatted, transaction?.transactions]);

   const [charOptions, setCharOptions] = useState<
      ApexCharts.ApexOptions | undefined
   >(undefined);

   useEffect(() => {
      const apexOptions = ApexConfigGoalsGraph({
         goalsData,
         monthNames,
      }) as ApexCharts.ApexOptions | undefined;
      setCharOptions(apexOptions);
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
               <S.DialogTitle>(POR MES)</S.DialogTitle>
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
