import styled from 'styled-components';

interface TransactionItemLiProps {
   currentState: string;
}

export const TransactionItemLi = styled('li')<TransactionItemLiProps>`
   display: flex;
   width: 100%;

   align-items: center;
   justify-content: center;
   background-color: ${(props) =>
      props.currentState == 'revenue'
         ? 'rgba(0, 107, 3, 0.54)'
         : 'rgba(107, 0, 0, 0.54)'};
   padding: 0.1rem 0;
   min-height: 50px;
   border-radius: 10px;
   justify-content: space-between;
   overflow: hidden;
   margin: 1rem 0;
   height: 10px;
   &:hover {
      background-color: ${(props) =>
         props.currentState == 'revenue'
            ? 'rgba(0, 107, 3, 0.84)'
            : 'rgba(107, 0, 0, 0.84)'};
   }
`;

export const HelperContainer = styled('div')`
   width: 90%;
   display: flex;
   align-items: center;
   padding-left: 20px;
   justify-content: space-between;
`;

export const AmountWrapper = styled('div')`
   display: flex;
   gap: 10px;
`;

interface AmountProps {
   negative?: boolean;
}

export const Amount = styled('p')<AmountProps>`
   font-size: 0.8rem;
   color: ${(props) =>
      props.negative
         ? props.theme.colors.PersianRed
         : props.theme.colors.Verdigris};
   white-space: nowrap;
`;

export const DueDate = styled('span')<any>`
   display: flex;
   flex-direction: column;
   font-size: 10px;
   gap: 19px;
`;

export const DeleteTransaction = styled('button')`
   margin: 0 1rem;
   cursor: pointer;
   color: ${(props) => props.theme.colors.TimberWhite};
   &:hover {
      color: ${(props) => props.theme.colors.PersianRed};
   }
`;
