import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { format } from 'date-fns';
import * as S from './PopoverDetailsStyles';
import { Transaction, useTransactionContext } from '../../../shared/contexts';
import { useEffect, useState } from 'react';

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
   // pending: Cadastra um debito que nao tenha seja uma inscrição e nem tenha recorrência.
   return (
      <>
         <S.PopOver left={props.left} top={props.top}>
            <S.SubDetailsWrapper flex={1 / 2}>
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
                        Finalizar!
                     </S.FinishedButton>
                  )}
               </S.Info>
               <S.Info>Categoria: {category.name}</S.Info>

               <S.Info>
                  Tipo{' '}
                  {type === 'expense' ? (
                     <S.Type>Dispensa</S.Type>
                  ) : (
                     <S.Type>Receita</S.Type>
                  )}
               </S.Info>
            </S.SubDetailsWrapper>

            <S.SubDetailsWrapper flex={1 / 2}>
               {installments !== null && installments !== 0 && (
                  <S.Info>
                     Numero de vezes X{installments}
                     <S.Total>
                        Total <br /> {value}
                     </S.Total>
                  </S.Info>
               )}
               {installments !== null && (
                  <S.Info>Recorrência {formattedForPortuguese}</S.Info>
               )}
               <S.Info>Data de criação {currentCreatedAtFormatted}</S.Info>
            </S.SubDetailsWrapper>
         </S.PopOver>
      </>
   );
};
