import * as S from './TransactionLIstItem';
import { format } from 'date-fns';
import { PopoverDetails } from '../PopoverTest/PopoverDetails';
import { useRef, useState } from 'react';
import { Transaction } from '../../../shared/contexts';

export interface TransactionListItemProps {
   id: string;
   description: string;
   value: string;
   recurrence: string;
   installments: 12;
   isSubscription: boolean | null;
   due_date: string;
   resolved: boolean;
   created_at: string;
   updated_at: string;
   type: string;
   userId: string;
   transactionsCategoryId: string;
}

const FormatCurense = (amount: number) =>
   new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(amount);

export const TransactionListItem = ({ params }: { params: Transaction }) => {
   const LiRef = useRef<HTMLDivElement>(null);
   const [showPopOver, setShowPopover] = useState(false);
   const [popOverPosition, setPopoverPosition] = useState({
      top: 0,
      left: 0,
   });
   const {
      value: amount,
      resolved,
      due_date,
      type,
      filingDate,
      isSubscription,
      installments,
      category,
   } = params;

   let dateFormatted = '';

   if (due_date) {
      dateFormatted = format(new Date(due_date), 'dd/MM/yyyy');
   } else if (filingDate) {
      dateFormatted = format(new Date(filingDate), 'dd/MM/yyyy');
   }

   const handleMouseIn = () => {
      const { left, bottom } = LiRef.current?.getBoundingClientRect() as {
         left: number;
         bottom: number;
      };

      setPopoverPosition({
         left: left,
         top: bottom,
      });

      setShowPopover(true);
      return;
   };

   const handleMouseOut = () => {
      setShowPopover(false);
      return;
   };

   let NumberFormatted;

   if (isSubscription == false && installments !== null && installments !== 0) {
      NumberFormatted =
         installments +
         'X' +
         ' ' +
         FormatCurense(Number(amount) / installments);
   } else {
      NumberFormatted = FormatCurense(Number(amount));
   }

   type categoryMappingType = {
      [key: string]: string;
   };

   const categoryMapping: categoryMappingType = {
      transport: 'Transporte',
      food: 'Comida',
      habitation: 'Habitação',
      health: 'Saúde',
      education: 'Educação',
      leisure: 'Lazer',
      products: 'Produtos',
      debts: 'Débitos',
      Taxes: 'Taxas',
      Investments: 'Investimentos',
   };

   const formattedCategoryName =
      categoryMapping[category.name] || 'Desconhecida';

   return (
      <>
         <S.TransactionItemLi
            currentState={params.type}
            ref={LiRef}
            as="div"
            onMouseEnter={handleMouseIn}
            onMouseLeave={handleMouseOut}
         >
            {showPopOver && (
               <PopoverDetails
                  content={{
                     ...params,
                     value: FormatCurense(Number(amount)),
                     category: {
                        name: formattedCategoryName,
                        created_at: category.created_at,
                        id: category.id,
                        updated_at: category.updated_at,
                     },
                  }}
                  left={popOverPosition.left}
                  top={popOverPosition.top}
               />
            )}

            <S.TransactionContent>
               <S.DueDate>
                  {due_date !== null && 'Data De Vencimento'}
                  {filingDate !== null && 'Data De Recebimento'}
               </S.DueDate>
               <S.DueDate>{dateFormatted}</S.DueDate>
            </S.TransactionContent>
            <S.TransactionContent>
               <S.Amount negative={Number(amount) <= 0}>
                  {NumberFormatted}
               </S.Amount>
               <span>
                  {type === 'revenue'
                     ? 'Receita'
                     : type === 'expense' && resolved === false
                     ? 'Nao pago'
                     : 'Paga'}
               </span>
            </S.TransactionContent>
         </S.TransactionItemLi>
      </>
   );
};
