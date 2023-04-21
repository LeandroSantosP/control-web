import * as S from './GraphHeaderStyles';

import { GraphsInfos } from '../../atoms/GraphsInfos/GraphsInfos';
import { useState } from 'react';
import { GoalsTransactionModal } from '../GoalTransactionModal/GoalTransactionModal';
import { Target } from '@phosphor-icons/react';

const TargetButton = ({ children }: { children: React.ReactNode }) => {
   return (
      <S.DialogTrigger>
         <Target />
         {children}
      </S.DialogTrigger>
   );
};

export const GraphHeader = () => {
   const [showInfo, setShowInfo] = useState(false);
   return (
      <S.Wrapper>
         <S.InfosButton
            size={15}
            onClick={() => setShowInfo((prev) => !prev)}
         />
         <GoalsTransactionModal TargetButton={TargetButton} />
         {showInfo && <GraphsInfos />}
      </S.Wrapper>
   );
};
