import styled from 'styled-components';

export const StatusContainer = styled('div')`
   display: flex;
   height: 200px;
   width: 100%;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 0.5rem;

   border-radius: 0.4rem;
   background-color: ${(props) => props.theme.colors.Dark};
`;

export const BalenseWrapper = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 4px;
   font-size: 1rem;
`;
export const CurrentBalense = styled('span')`
   font-size: 0.6rem;
`;

export const WalletImage = styled('img')`
   width: 50px;
   font-size: 10rem;
   margin: 0;
   border-radius: 50%;
`;

interface AmountProps {
   isNegative: boolean;
}
export const Amount = styled('span')<AmountProps>`
   color: ${(props) => props.isNegative && 'red'};
`;
