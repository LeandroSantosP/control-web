import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowDown } from '@phosphor-icons/react';
export const DialogRoot = styled(Dialog.Root)``;

const fadeIn = keyframes`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`;

const fadeOut = keyframes`
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
`;

interface FormProps {
   hide: boolean;
}

export const Form = styled('form')<FormProps>`
   display: flex;
   min-width: 118px;
   z-index: 999;
   height: 140px;
   position: absolute;
   flex-direction: row;
   gap: 2rem;
   overflow-y: scroll;
   width: 800px;
   padding: 0.8rem;
   left: 3.5rem;
   bottom: 1.9rem;
   border-radius: 0.4rem;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   transform-origin: ${(props) => (props.hide ? 'left' : 'right')};
   animation: ${(props) => (props.hide ? fadeIn : fadeOut)} 0.2s forwards;
`;

export const MoreContentArrow = styled(ArrowDown)`
   font-size: 1rem;
   color: red;
   background-color: ${(props) => props.theme.colors.TimberWhite};
   border-radius: 50%;
   color: ${(props) => props.theme.colors.Dark};
   right: 2.5rem;
   bottom: 1rem;
   position: absolute;
   transform: translateX(-50%);
   animation: arrow-animation 1s ease-in-out infinite;
   @keyframes arrow-animation {
      0% {
         transform: translate(-50%, 0);
      }
      50% {
         transform: translate(-50%, 10px);
      }
      100% {
         transform: translate(-50%, 0);
      }
   }
`;

export const WrapperButtons = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 5px;
`;

export const Button = styled('button')`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 0.3rem;
   width: 100%;
   color: #111;
   font-size: 0.9rem;
   background-color: ${(props) => props.theme.colors.TimberWhite};
   border-radius: 0.4rem;
`;

export const WrapperMúltiplosFields = styled('div')`
   display: flex;
   justify-content: center;
   position: relative;
   border-radius: 0.4rem;
   gap: 0.1rem;
   margin-bottom: 20px;
`;

export const LabelAndInputWrapper = styled('div')`
   display: flex;
   align-items: center;
   flex-direction: column;
   padding: 10px;
   width: 100%;
   bottom: 2rem;
   background-color: ${(props) => props.theme.colors.Dark};
`;

export const ErrorMessage = styled('span')`
   font-size: 0.7rem;
   color: red;
`;

export const RemoveButton = styled('button')`
   height: 20px;
   width: 20px;
   padding: 0.2rem;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 50%;
   position: absolute;
   left: 2px;
   top: 2px;
   cursor: pointer;
   color: #fff;
   background-color: ${(props) => props.theme.colors.PersianRed};

   &:hover {
      background-color: red;
   }
`;
