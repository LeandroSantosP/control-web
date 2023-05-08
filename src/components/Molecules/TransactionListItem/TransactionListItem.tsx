import * as S from './TransactionLIstItem';
import { format } from 'date-fns';
import { PopoverDetails } from '../Popover/PopoverDetails';
import { useRef, useState } from 'react';
import {
   Transaction,
   useFlashMessageContext,
   useTransactionContext,
} from '../../../shared/contexts';
import { memo } from 'react';
import { FormatCurense } from '../../../shared/helpers/FormatCurense';
import { Trash, X } from '@phosphor-icons/react';

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

function TransactionListItem({ params }: { params: Transaction }) {
   const {
      value: amount,
      resolved,
      due_date,
      type,
      filingDate,
      isSubscription,
      installments,
      category,
      id,
   } = params;
   const LiRef = useRef<HTMLDivElement>(null);
   const { DeleteTransaction } = useTransactionContext();
   const [confirmationDelete, setConfirmationDelete] = useState<
      'delete' | 'confim'
   >('delete');
   const { handleShowingFlashMessage } = useFlashMessageContext();
   const [showPopOver, setShowPopover] = useState(false);
   const [popOverPosition, setPopoverPosition] = useState({
      top: 0,
      left: 0,
   });

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

   async function handleDeleteTransition() {
      try {
         if (confirmationDelete == 'confim') {
            const response = await DeleteTransaction(id);
            if (response === undefined) {
               handleShowingFlashMessage({
                  message: 'Transaction Apagada com sucesso.',
                  timer: 90000,
                  type: 'success',
                  haveButton: false,
               });
            }
         }
      } catch (error) {
         //Error on delete transaction.
         console.error(error);
      } finally {
         setConfirmationDelete('delete');
      }
   }

   return (
      <>
         <S.TransactionItemLi
            currentState={params.type}
            ref={LiRef}
            as="div"
            onMouseEnter={handleMouseIn}
            onMouseLeave={handleMouseOut}
         >
            <S.HelperContainer>
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
               <div
                  style={{
                     display: 'flex',
                     gap: '2rem',
                     alignItems: 'center',
                  }}
               >
                  <div
                     style={{
                        whiteSpace: 'nowrap',
                        width: '2rem',
                     }}
                  >
                     <span>
                        {type === 'revenue'
                           ? 'Receita'
                           : type === 'expense' && resolved === false
                           ? 'Não pago'
                           : 'Paga'}
                     </span>
                  </div>
                  <div>
                     <S.DueDate style={{ whiteSpace: 'nowrap' }}>
                        {due_date !== null && 'Data De Vencimento'}
                        {filingDate !== null && 'Data De Recebimento'}
                     </S.DueDate>
                     <S.DueDate>{dateFormatted}</S.DueDate>
                  </div>
               </div>

               <S.AmountWrapper>
                  <S.Amount negative={Number(amount) <= 0}>
                     {NumberFormatted}
                  </S.Amount>
               </S.AmountWrapper>
            </S.HelperContainer>
            <S.DeleteTransaction>
               {confirmationDelete === 'delete' ? (
                  <Trash
                     size={20}
                     onClick={() => setConfirmationDelete('confim')}
                  />
               ) : (
                  <X onClick={handleDeleteTransition} size={20} />
               )}
            </S.DeleteTransaction>
         </S.TransactionItemLi>
      </>
   );
}

export default memo(TransactionListItem);
