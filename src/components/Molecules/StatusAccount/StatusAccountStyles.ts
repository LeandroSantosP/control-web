import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: rotate(100%);
    opacity: 0;
  }

  to {
    transform: rotate(0);
    opacity: 1;
  }
`;

export const StatusContainer = styled('div')`
   display: flex;
   height: 100%;
   width: 100%;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 0.5rem;
   animation: ${slideIn} 0.5s ease-in-out;

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
   color: ${(props) => props.isNegative && props.theme.colors.PersianRed};
`;
