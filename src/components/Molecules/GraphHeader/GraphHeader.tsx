import * as S from './GraphHeaderStyles';
import { GraphsInfos } from '../../atoms/GraphsInfos/GraphsInfos';
import { useState } from 'react';
import { GoalsTransactionModal } from '../GoalTransactionModal/GoalTransactionModal';
import { Target, ArrowsCounterClockwise } from '@phosphor-icons/react';
import { useTransactionContext } from '../../../shared/contexts';

const TargetButton = ({ children }: { children: React.ReactNode }) => {
   return (
      <S.DialogTrigger>
         <Target />
         {children}
      </S.DialogTrigger>
   );
};

export const GraphHeader = () => {
   const { currentTransactionType, setCurrentTransactionType } =
      useTransactionContext();
   const [showInfo, setShowInfo] = useState(false);

   return (
      <S.Wrapper>
         <S.InfosButton
            size={15}
            onClick={() => setShowInfo((prev) => !prev)}
         />
         <S.ToggleButton
            onClick={() =>
               setCurrentTransactionType((prev) => {
                  if (prev === 'expense') {
                     return 'revenue';
                  }
                  return 'expense';
               })
            }
         >
            <ArrowsCounterClockwise size={20} />
            {currentTransactionType === 'expense' ? 'Receitas' : 'Dispensas'}
         </S.ToggleButton>

         <GoalsTransactionModal TargetButton={TargetButton} />
         {showInfo && <GraphsInfos />}
      </S.Wrapper>
   );
};
