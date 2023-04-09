import styled from 'styled-components';
import { Check } from '@phosphor-icons/react';

interface TransactionItemLiProps {
   currentState: string;
}

export const TransactionItemLi = styled('li')<TransactionItemLiProps>`
   display: flex;
   width: 100%;
   align-items: center;
   background-color: ${(props) =>
      props.currentState == 'revenue'
         ? 'rgba(0, 107, 3, 0.54)'
         : 'rgba(107, 0, 0, 0.54)'};
   padding: 0.5rem 0;
   border-radius: 10px;
   justify-content: space-between;
   max-height: 4rem;
   text-align: center;
   overflow: hidden;
   margin: 1rem 0;
`;

export const TransactionContent = styled('div')`
   display: flex;
   flex-direction: column;
   font-size: small;
   gap: 9px;
   margin: 0 1rem;
   span {
      font-weight: 50;
   }
`;

interface AmountProps {
   negative?: boolean;
}

export const Amount = styled('div')<AmountProps>`
   color: ${(props) =>
      props.negative
         ? props.theme.colors.PersianRed
         : props.theme.colors.Verdigris};
`;

export const DueDate = styled('span')<any>`
   display: flex;
   flex-direction: column;
   font-size: 10px;
   gap: 19px;
`;
