import * as S from './GraphHeaderStyles';

import { Progress } from '../../atoms/Progress/Progress';
import { GraphsInfos } from '../../atoms/GraphsInfos/GraphsInfos';
import { useState } from 'react';
import { GoalsTransactionModal } from '../GoalTransactionModal/GoalTransactionModal';

export const GraphHeader = () => {
   const [showInfo, setShowInfo] = useState(false);
   return (
      <S.Wrapper>
         <S.InfosButton
            size={15}
            onClick={() => setShowInfo((prev) => !prev)}
         />
         <h1>header</h1>
         <GoalsTransactionModal />

         {showInfo && <GraphsInfos />}
         <Progress />
      </S.Wrapper>
   );
};
