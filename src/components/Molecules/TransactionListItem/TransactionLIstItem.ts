import styled from 'styled-components';

export const TransactionItemLi = styled('li')`
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: space-between;
   max-height: 4rem;
   text-align: center;
   margin: 1rem 0;
`;

export const TransactionContent = styled('div')`
   display: flex;
   flex-direction: column;
   font-size: small;
   gap: 2px;

   margin: 0 1rem;

   span {
      font-weight: 50;
   }
`;

interface AmountProps {
   negative?: boolean;
}

export const Amount = styled('div')<AmountProps>`
   color: ${(props) => (props.negative ? 'red' : 'green')};
`;
