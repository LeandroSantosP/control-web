import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

export const DialogContent = styled(Dialog.Content)`
   position: absolute;
   margin: 0 auto;
   width: 450px;
   height: 600px;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
`;

export const DialogOverlay = styled(Dialog.Overlay)`
   width: 100%;
   position: absolute;
   height: 100%;
   background-color: #1e1d1dbf;
`;

export const DialogTrigger = styled(Dialog.Trigger)`
   display: flex;
   border: none;
   background: rgba(255, 255, 255, 0.36);
   border-radius: 4px;
   width: 50px;
   padding: 0.5rem;
   transition: 0.1s ease-in;
   text-align: center;
   justify-content: center;
   cursor: pointer;
   font-size: 1.1rem;
   font-weight: 900;
`;

export const DialogClose = styled(Dialog.Close)`
   display: flex;
   position: absolute;
   border: none;
   border-radius: 50%;
   border: 1px solid #fff;
   color: #fff;
   background: transparent;
   transition: 0.1s ease-in;
   text-align: center;
   justify-content: center;
   cursor: pointer;
   font-size: 1.1rem;
   font-weight: 900;
   right: 1rem;
   top: 1rem;
`;

export const Form = styled('form')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   background-color: #111;
   height: 100%;
   width: 100%;
   border-radius: 1rem;
   align-items: center;
   padding: 1rem;
   font-size: 1rem;
   border: 5px solid #111;
   align-items: flex-end;
   button {
      margin-bottom: 1rem;
   }
`;

interface InputTransactionValuePros {
   color: string;
}

export const InputTransactionValue = styled('input')<InputTransactionValuePros>`
   display: flex;
   margin: 0 auto;
   margin-bottom: 3rem;
   background-color: transparent;
   width: 300px;
   border: none;
   text-align: center;
   font-size: 2rem;
   color: ${(props) =>
      props.color === 'Receita'
         ? props.theme.colors.Verdigris
         : props.theme.colors.PersianRed};
   border-bottom: 1px solid #fff;
   outline: none;
   transition: 0.4s ease;
`;

export const Title = styled('h2')`
   font-size: ${(props) => props.theme.fontSize.medium};
   color: #fff;
   margin: 2rem 0;
`;

export const TitleTransaction = styled('h2')`
   font-size: ${(props) => props.theme.fontSize.medium};
   color: #fff;
`;

export const ErrorMessage = styled('span')`
   margin-bottom: 1rem;
   font-size: ${(props) => props.theme.fontSize.small};
   color: ${(props) => props.theme.colors.PersianRed};
`;
export const SelectWrapper = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 0.7rem;
   right: 3rem;
`;
