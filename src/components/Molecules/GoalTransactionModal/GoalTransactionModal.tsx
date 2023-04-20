import { z } from 'zod';
import { useState, ChangeEvent, useEffect } from 'react';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import VMasker, { toMoney } from 'vanilla-masker';
import { FormatCurense } from '../../../shared/helpers/FormatCurense';
import Chart from 'react-apexcharts';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { CaretDown, CaretRight, Target, X } from '@phosphor-icons/react';

import * as S from './GoalTransactionModalStyles';
import { useGoalsStorage } from '../../../shared/store';
import { CreateNewGoalForm } from '../CreateNewGoalForm/CreateNewGoalForm';

type ValidMonthsType = {
   [key: string]: string;
};

const ValidMonths: ValidMonthsType = {
   '01': 'Janeiro',
   '02': 'Fevereiro',
   '03': 'Março',
   '04': 'Abril',
   '05': 'Maio',
   '06': 'Junho',
   '07': 'Julho',
   '08': 'Agosto',
   '09': 'Setembro',
   '10': 'Outubro',
   '11': 'Novembro',
   '12': 'Dezembro',
};

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
   const [showCreateGoals, setShowCreateGoals] = useState(false);

   const [showDeleteGoals, setShowDeleteGoals] = useState(false);

   const [charOptions, setCharOptions] = useState<
      ApexCharts.ApexOptions | undefined
   >({});

   const {
      state: { goals },
      actions: { createOrUpdated, list },
   } = useGoalsStorage();

   const createGoalForm = useForm<createGoalsData>({
      resolver: zodResolver(createGoalsSchema),
      defaultValues: {
         dataForUpdate: [
            { expectated_expense: '', expectated_revenue: '', month: '' },
         ],
      },
   });

   const {
      handleSubmit,
      reset,
      control,
      setValue,
      formState: { errors },
   } = createGoalForm;

   const createGaols = async (data: createGoalsData) => {
      const result = data.dataForUpdate.map((data) => {
         const curren33tValue = {
            toDecimal: (value: string) => {
               return parseFloat(VMasker.toNumber(value)) / 100;
            },
            execute: (
               currentType: 'expectated_expense' | 'expectated_revenue'
            ) => {
               const value = data[currentType].replaceAll('R$', '');

               if (!value || isNaN(parseFloat(value))) {
                  console.error(
                     'This Value is invalid for Decimal Value!',
                     value
                  );
                  return;
               }

               let decimalValue = curren33tValue.toDecimal(value).toString();
               if (currentType === 'expectated_expense') {
                  decimalValue = '-' + decimalValue;
               }

               return decimalValue;
            },
         };

         const expectated_expense =
            curren33tValue.execute('expectated_expense');

         const expectated_revenue =
            curren33tValue.execute('expectated_revenue');

         return {
            month: data.month,
            expectated_expense,
            expectated_revenue,
         };
      });

      try {
         await createOrUpdated({
            createIfNotExist: true,
            dataForUpdate: result,
         });
         await list();
         reset();
         setShowCreateGoals(false);
         return;
      } catch (err) {
         if (err instanceof AxiosError) {
            console.error(err.response?.data.message);
         }
         reset();
         return err;
      }
   };

   const { dataForUpdate } = errors;

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'dataForUpdate',
   });

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

   useEffect(() => {
      if (fields.length === 0) {
         setShowCreateGoals(false);
         createGoalForm.resetField('dataForUpdate');
      }
   }, [createGoalForm, createGoalForm.resetField, fields]);

   const addNewGoal = () => {
      append({ expectated_expense: '', expectated_revenue: '', month: '' });
   };

   const handleChange = (
      event: ChangeEvent<HTMLInputElement>,
      index: number
   ) => {
      const { name, value } = event.target;

      const valueFormatted = toMoney(value, {
         unit: 'R$',
      }) as string;

      const currentInput = name.split('.').splice(-1)[0] as
         | 'expectated_revenue'
         | 'expectated_expense';

      if (['expectated_revenue'].includes(currentInput)) {
         setValue(`dataForUpdate.${index}.${currentInput}`, valueFormatted);
         return;
      }
      setValue(`dataForUpdate.${index}.${currentInput}`, valueFormatted);
      return;
   };

   const handleClick = () => {
      setShowCreateGoals((prev) => !prev);
   };

   const CreateNewGoalsProps = {
      addNewGoal,
      createGaols,
      dataForUpdate,
      errors,
      fields,
      handleChange,
      handleSubmit,
      remove,
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
               <S.ButtonCreateGoals visible={'visible'} bottom="8rem">
                  {showDeleteGoals ? (
                     <CaretRight size={30} />
                  ) : (
                     <CaretDown size={30} />
                  )}
               </S.ButtonCreateGoals>
               <S.ButtonCreateGoals visible={'visible'} onClick={handleClick}>
                  {showCreateGoals ? (
                     <CaretRight size={30} />
                  ) : (
                     <CaretDown size={30} />
                  )}
               </S.ButtonCreateGoals>
               {showCreateGoals && (
                  <FormProvider {...createGoalForm}>
                     <CreateNewGoalForm {...CreateNewGoalsProps} />
                  </FormProvider>
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
