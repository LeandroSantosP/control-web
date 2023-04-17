import * as S from './GoalTransactionModalStyles';
import { Target } from '@phosphor-icons/react';

export const GoalsTransactionModal = () => {
   return (
      <S.DialogRoot>
         <S.DialogTrigger>
            <Target />
         </S.DialogTrigger>
         <S.DialogPortal>
            <S.DialogOverlay />
            <S.DialogContent>
               <S.DialogTitle>Titulo</S.DialogTitle>
               <S.DialogDescription>
                  Make changes to your profile here. Click save when you re
                  done.
               </S.DialogDescription>
            </S.DialogContent>
         </S.DialogPortal>
      </S.DialogRoot>
   );
};
