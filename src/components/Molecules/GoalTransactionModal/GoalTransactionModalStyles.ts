import styled, { keyframes } from 'styled-components';
import Chart from 'react-apexcharts';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowDown } from '@phosphor-icons/react';
export const DialogRoot = styled(Dialog.Root)``;

export const DialogPortal = styled(Dialog.Portal)``;

export const DialogOverlay = styled(Dialog.Overlay)`
   width: 100%;
   position: absolute;
   height: 100%;

   background-color: #1e1d1dbf;
`;

export const DialogContent = styled(Dialog.Content)`
   position: absolute;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   gap: 2rem;
   width: 100%;
   max-width: 1000px;
   padding: 0.8rem;
   border-radius: 0.5rem;
   margin: 0 auto;
   height: 100%;
   max-height: 600px;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   z-index: 50;
   animation: fadeIn 0.3s ease-in-out forwards;

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`;

export const DialogTitle = styled(Dialog.Title)`
   margin: 0;
   font-weight: 500;
   color: #fff;
   font-size: 17px;
`;

export const DialogDescription = styled(Dialog.Description)`
   margin: 0 20px;
   color: #fff;
   font-size: 1.5rem;
   line-height: 1.5;
`;

export const DialogClose = styled(Dialog.Close)`
   position: absolute;
   top: 10px;
   right: 10px;
   font-size: 1rem;

   &:hover {
      cursor: pointer;
      border-radius: 9999;
      background-color: rgba(59, 59, 59, 0.26);
   }
`;

interface GoalsGraphsProps {
   height: string;
}

export const GoalsGraphs = styled('div')<GoalsGraphsProps>`
   display: flex;
   justify-content: center;
   align-items: center;
   max-height: 100%;
   width: 100%;
   border-radius: 0.4rem;
   gap: 1rem;

   background-color: ${(props) => props.theme.colors.Dark};
   :not(:last-child) {
      margin-bottom: 1rem;
   }
`;

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

interface InputProps {
   width: string;
   fontSize: string;
}

export const Input = styled('input')<InputProps>`
   outline: none;
   border: none;
   color: ${(props) => props.theme.colors.TimberWhite};
   background-color: transparent;
   width: ${(props) => props.width};
   font-size: 2rem;
   border-bottom: 1px solid ${(props) => props.theme.colors.TimberWhite};
   text-align: center;
   margin-bottom: 20px;
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

type ButtonCreateGoalsProps = {
   visible: 'hidden' | 'visible';
   left?: string;
   bottom?: string;
   bg?: string;
};

export const ButtonCreateGoals = styled('button')<ButtonCreateGoalsProps>`
   position: absolute;
   display: flex;
   justify-content: center;
   text-align: center;
   align-items: center;
   cursor: pointer;
   border: none z;
   background-color: ${(props) => props.bg || `rgba(59, 59, 59, 0.26)`};
   height: 30px;
   z-index: 999;
   width: 30px;
   left: ${(props) => props.left ?? '1.5rem'};
   bottom: ${(props) => props.bottom ?? '5.6rem'};
   border-radius: 99999%;
   visibility: ${(props) => props.visible};
   transition: transform 0.3s ease-out;

   &:hover {
      transform: translateY(-2px);
   }

   &:active {
      transform: translateY(2px);
   }
`;

export const IconWrapper = styled('div')`
   display: flex;
   align-items: center;
   justify-content: center;
   transition: transform 0.3s ease-out;
`;

//Chart

export const ChartCustoms = styled(Chart)`
   display: flex;
   width: 80%;
`;

// Skeletons

export const GoalsGraphsSkeleton = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 90%;
   width: 100%;
   border-radius: 0.4rem;
   gap: 1rem;
   animation: skeleton-loading 1s linear infinite alternate;

   @keyframes skeleton-loading {
      0% {
         background-color: rgba(34, 31, 33, 0.49);
      }
      100% {
         background-color: rgba(184, 184, 184, 0.49);
      }
   }

   background-color: ${(props) => props.theme.colors.Dark};
`;
