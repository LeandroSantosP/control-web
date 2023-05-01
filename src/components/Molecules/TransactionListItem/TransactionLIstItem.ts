import styled from 'styled-components';

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

   &:hover {
      background-color: ${(props) =>
         props.currentState == 'revenue'
            ? 'rgba(0, 107, 3, 0.84)'
            : 'rgba(107, 0, 0, 0.84)'};
   }
`;

export const TransactionContent = styled('div')`
   display: flex;
   flex-direction: column;
   font-size: small;
   margin: 0 1rem;
   margin-right: 2rem;
   gap: 9px;
   span {
      font-weight: 50;
   }
`;

export const SubTransactionContent = styled('div')`
   display: flex;
   gap: 10px;
`;

interface AmountProps {
   negative?: boolean;
}

export const Amount = styled('div')<AmountProps>`
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
   right: 20px;

   right: 5px;
   top: 5px;
   cursor: pointer;
   color: ${(props) => props.theme.colors.TimberWhite};

   &:hover {
      color: ${(props) => props.theme.colors.PersianRed};
   }
`;
