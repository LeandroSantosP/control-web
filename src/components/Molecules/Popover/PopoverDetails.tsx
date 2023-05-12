import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { motion, Variants } from 'framer-motion';
import { format } from 'date-fns';
import { Transaction, useTransactionContext } from '../../../shared/contexts';
import { useEffect, useState } from 'react';
import * as S from './PopoverDetailsStyles';

interface PopOverTest {
   top: number;
   left: number;
   content: Transaction;
}

export const PopoverDetails = (props: PopOverTest) => {
   const [formattedForPortuguese, setFormattedForPortuguese] = useState<
      'Mensal' | 'Anual' | 'Diária' | ''
   >('');
   const { ResolvedTransaction } = useTransactionContext();
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
                  Finalizada?{' '}
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
               <S.Info>Categoria: {category.name}</S.Info>

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
               <S.DescriptionWrapper>{description}</S.DescriptionWrapper>
            </S.SubDetailsWrapper>
         </S.PopOver>
      </>
   );
};
