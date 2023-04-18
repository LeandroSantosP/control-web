import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

export const DialogRoot = styled(Dialog.Root)``;

export const DialogTrigger = styled(Dialog.Trigger)`
   width: 60px;
   height: 20px;
   border-radius: 20px;
   border: 1px solid #fff;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   gap: 10px;
   transition: all 0.3s;
   font-size: 20px;

   &:hover {
      background-color: ${(props) => props.theme.colors.White};
      color: ${(props) => props.theme.colors.Dark};
   }
`;

export const DialogPortal = styled(Dialog.Portal)``;

export const DialogOverlay = styled(Dialog.Overlay)`
   width: 100%;
   position: absolute;
   height: 100%;

   background-color: #1e1d1dbf;
`;

export const DialogContent = styled(Dialog.Content)`
   z-index: 999;
   position: absolute;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   gap: 2rem;
   width: 1000px;
   padding: 0.8rem;
   border-radius: 0.5rem;
   margin: 0 auto;
   height: 600px;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
`;

export const DialogTitle = styled(Dialog.Title)`
   margin: 0;
   font-weight: 500;
   color: #fff;
   font-size: 17px;
`;

export const DialogDescription = styled(Dialog.Description)`
   margin: 10px 0 20px;
   color: #fff;
   font-size: 2rem;
   line-height: 1.5;
`;

export const DialogClose = styled(Dialog.Close)`
   position: absolute;
   top: 10px;
   right: 10px;
   font-size: 1rem;
`;

interface GoalsGraphsProps {
   height: string;
}

export const GoalsGraphs = styled('div')<GoalsGraphsProps>`
   display: flex;
   justify-content: center;
   align-items: center;
   height: ${(props) => props.height};
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

export const ButtonCreateGoals = styled('button')`
   position: absolute;
   display: flex;
   justify-content: center;
   text-align: center;
   align-items: center;
   cursor: pointer;
   border: none z;
   background-color: rgba(59, 59, 59, 0.62);
   height: 30px;
   width: 30px;
   left: 1rem;
   bottom: 5.5rem;
   border-radius: 99999%;
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
