import { CheckCircle, Pencil, Spinner, XCircle } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { motion, Variants } from 'framer-motion';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Transaction, useTransactionContext } from '../../../shared/contexts';
import { categoryList } from '../../../shared/helpers/CategoryMonthlyMocks';
import { EditButton } from '../../atoms/EditButton/EditButton';
import { SelectCustom } from '../Select/Select';
import * as S from './PopoverDetailsStyles';

interface PopOverTest {
   top: number;
   left: number;
   content: Transaction;
}

export const PopoverDetails = (props: PopOverTest) => {
   const {
      isSubscription,
      resolved,
      type,
      installments,
      recurrence,
      id,
      value,
      category,
      description,
   } = props.content;
   const [editLoading, setEditLoading] = useState(false);
   const { EditTransactionRequest } = useTransactionContext();
   const [newDesc, setNewDesc] = useState(props.content.description);
   const [showEditDesc, setShowEditDesc] = useState(false);
   const [formattedForPortuguese, setFormattedForPortuguese] = useState<
      'Mensal' | 'Anual' | 'Diária' | ''
   >('');
   const { ResolvedTransaction } = useTransactionContext();

   const [categoryEditValue, setCategoryEditValue] = useState<string>(
      category.name
   );

   let currentCreatedAtFormatted;
   if (props.content.created_at !== null) {
      currentCreatedAtFormatted = format(
         new Date(props.content.created_at),
         'dd-MM-yyyy'
      ).replace(/-/g, '/');
   }

   const handleResolvedTransaction = async () => {
      await ResolvedTransaction(id);
   };

   const handleMouseEdit = async () => {
      setEditLoading(true);
      await EditTransactionRequest({
         category: categoryEditValue,
         transaction_id: props.content.id,
         description: newDesc,
      }).finally(() => setEditLoading(false));
   };

   useEffect(() => {
      let currentRecurrence = '' as any;

      if (recurrence === 'monthly') {
         currentRecurrence = 'Mensal';
      } else if (recurrence === 'yearly') {
         currentRecurrence = 'Anual';
      } else if (recurrence === 'daily') {
         currentRecurrence = 'Diária';
      } else {
         currentRecurrence = '';
      }

      setFormattedForPortuguese(currentRecurrence);
   }, [recurrence]);

   const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
   } as Variants;

   return (
      <>
         <S.PopOver
            as={motion.div}
            variants={variants}
            initial="hidden"
            animate="visible"
            left={props.left}
            top={props.top}
         >
            {editLoading && (
               <S.LoadingShadow>
                  <Spinner size={40} />
               </S.LoadingShadow>
            )}

            <S.SubDetailsWrapper>
               <S.Info>
                  Inscrição?{' '}
                  {isSubscription === null || isSubscription === false ? (
                     <XCircle color="red" />
                  ) : (
                     <CheckCircle color="green" />
                  )}
               </S.Info>

               <S.Info>
                  Finalizada ?{' '}
                  {resolved ? (
                     <CheckCircle color="green" />
                  ) : (
                     <XCircle color="red" />
                  )}
                  {!resolved && (
                     <S.FinishedButton onClick={handleResolvedTransaction}>
                        Marcar como Finalizado!
                     </S.FinishedButton>
                  )}
               </S.Info>
               <SelectCustom
                  disable={!showEditDesc}
                  setCurrentValue={setCategoryEditValue}
                  currentValue={categoryEditValue}
                  fieldList={categoryList}
               />
               <S.Info>
                  {type === 'expense' ? (
                     <S.Type>Tipo Dispensa</S.Type>
                  ) : (
                     <S.Type>Tipo Receita</S.Type>
                  )}
               </S.Info>
               {installments !== null && installments !== 0 && (
                  <S.Info>
                     X{installments} Total <br /> {value}
                  </S.Info>
               )}
               {installments !== null && (
                  <S.Info>Recorrência {formattedForPortuguese}</S.Info>
               )}
               <S.Info>Data de criação {currentCreatedAtFormatted}</S.Info>
            </S.SubDetailsWrapper>
            <S.SubDetailsWrapper padding="0px">
               <EditButton onClick={() => setShowEditDesc(!showEditDesc)}>
                  <Pencil />
               </EditButton>

               {showEditDesc && (
                  <EditButton
                     right="15px"
                     top="2.5rem"
                     onClick={handleMouseEdit}
                  >
                     <Save size={15} />
                  </EditButton>
               )}

               {!showEditDesc ? (
                  <S.DescriptionWrapper value={description} disabled={true} />
               ) : (
                  <S.EditDescriptionWrapper
                     value={newDesc}
                     onChange={({ target: { value } }) => setNewDesc(value)}
                  />
               )}
            </S.SubDetailsWrapper>
         </S.PopOver>
      </>
   );
};
