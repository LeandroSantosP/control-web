import { TransactionListItemProps } from '../TransactionListItem/TransactionListItem';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { format } from 'date-fns';
import * as S from './PopoverDetailsStyles';

interface PopOverTest {
   top: number;
   left: number;
   content: TransactionListItemProps;
}

export const PopoverDetails = (props: PopOverTest) => {
   const subscription = props.content.isSubscription;

   let currentCreatedAtFormatted;
   if (props.content.created_at !== null) {
      currentCreatedAtFormatted = format(
         new Date(props.content.created_at),
         'dd-MM-yyyy'
      ).replace(/-/g, '/');
   }

   return (
      <>
         <S.PopOver left={props.left} top={props.top}>
            <S.SubDetailsWrapper flex={1 / 2}>
               <S.Info>
                  Inscrição?{' '}
                  {subscription === null || subscription === false ? (
                     <XCircle color="red" />
                  ) : (
                     <CheckCircle color="green" />
                  )}
               </S.Info>
               <S.Info>Recorrência {props.content.recurrence}</S.Info>
               <S.Info>
                  Finalizada?{' '}
                  {props.content.resolved ? (
                     <CheckCircle color="green" />
                  ) : (
                     <XCircle color="red" />
                  )}
               </S.Info>
               <S.Info>
                  Tipo{' '}
                  {props.content.type === 'expense' ? (
                     <S.Type type={props.content.type}>Dispensa</S.Type>
                  ) : (
                     <S.Type>Receita</S.Type>
                  )}
               </S.Info>
            </S.SubDetailsWrapper>

            <S.SubDetailsWrapper flex={1 / 2}>
               <S.Info>Parcelas {props.content.installments}</S.Info>
               {props.content.installments !== null && (
                  <S.Info>Recorrência {props.content.recurrence}</S.Info>
               )}
               <S.Info>Data de criação {currentCreatedAtFormatted}</S.Info>
            </S.SubDetailsWrapper>
         </S.PopOver>
      </>
   );
};
