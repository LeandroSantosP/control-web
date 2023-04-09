import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { format } from 'date-fns';
import * as S from './PopoverDetailsStyles';
import { Transaction, useTransactionContext } from '../../../shared/contexts';

interface PopOverTest {
   top: number;
   left: number;
   content: Transaction;
}

export const PopoverDetails = (props: PopOverTest) => {
   const { ResolvedTransaction } = useTransactionContext();
   const { isSubscription, resolved, type, installments, recurrence, id } =
      props.content;

   let currentCreatedAtFormatted;
   if (props.content.created_at !== null) {
      currentCreatedAtFormatted = format(
         new Date(props.content.created_at),
         'dd-MM-yyyy'
      ).replace(/-/g, '/');
   }

   ResolvedTransaction;
   const handleResolvedTransaction = async () => {
      await ResolvedTransaction(id);
   };

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
               </S.Info>

               {!resolved && (
                  <S.FinishedButton onClick={handleResolvedTransaction}>
                     Finalizar!
                  </S.FinishedButton>
               )}

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
                  <S.Info>Numero de vezes {installments}x</S.Info>
               )}
               {installments !== null && (
                  <S.Info>Recorrência {recurrence}</S.Info>
               )}
               <S.Info>Data de criação {currentCreatedAtFormatted}</S.Info>
            </S.SubDetailsWrapper>
         </S.PopOver>
      </>
   );
};
