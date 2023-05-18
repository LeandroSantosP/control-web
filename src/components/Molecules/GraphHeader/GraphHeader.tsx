import { ArrowsCounterClockwise } from '@phosphor-icons/react';
import { ReactNode, useState } from 'react';
import { useTransactionContext } from '../../../shared/contexts';
import { GraphsInfos } from '../../atoms/GraphsInfos/GraphsInfos';
import { CreatePdf } from '../CreatePdf/CreatePdf';
import { GoalsTransactionModal } from '../GoalTransactionModal/GoalTransactionModal';
import * as S from './GraphHeaderStyles';

const TargetButton = ({
   children,
   Icon,
}: {
   children: React.ReactNode;
   Icon: ReactNode;
}) => {
   return (
      <S.DialogTrigger>
         {Icon}
         {children}
      </S.DialogTrigger>
   );
};

const TargetButtonPopOver = ({
   children,
   Icon,
}: {
   children: React.ReactNode;
   Icon: ReactNode;
}) => {
   return (
      <S.PopOverTrigger>
         {Icon}
         {children}
      </S.PopOverTrigger>
   );
};

export const GraphHeader = () => {
   const { currentTransactionType, setCurrentTransactionType } =
      useTransactionContext();
   const [showInfo, setShowInfo] = useState(false);

   return (
      <S.Wrapper>
         <S.InfosButton
            size={30}
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
         <CreatePdf TargetButtonPopOver={TargetButtonPopOver} />

         {showInfo && <GraphsInfos />}
      </S.Wrapper>
   );
};
