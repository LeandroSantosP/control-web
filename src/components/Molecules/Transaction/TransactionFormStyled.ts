import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';

export const DialogContent = styled(Dialog.Content)`
   position: absolute;
   margin: 0 auto;
   width: 450px;
   height: 600px;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
`;

export const ButtonForm = styled('button')`
   display: flex;
   padding: 10px;
   border: none;
   width: 70px;
   height: 10px;
   margin: 0;
   border-radius: 0.3rem;
   justify-content: center;
   align-items: center;
   margin: 1rem 0;
   cursor: pointer;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
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
   transition: 0.3s ease;
   text-align: center;
   justify-content: center;
   cursor: pointer;
   font-size: 1.1rem;
   font-weight: 900;
`;

export const DialogClose = styled(Dialog.Close)`
   display: flex;
   position: absolute;
   background-color: red;
   border: none;
   border-radius: 50%;
   color: #fff;
   background: transparent;
   transition: 0.3s ease;
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
   width: 100%;
   border-radius: 1rem;
   position: relative;
   align-items: center;
   padding: 1rem;
   font-size: 1rem;
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
   align-items: flex-end;
`;

interface InputTransactionValuePros {
   color: string;
}

export const Wrapper = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 100%;
   height: 100%;
   margin-top: 2rem;
`;

export const InputTransactionValue = styled('input')<InputTransactionValuePros>`
   display: flex;
   margin: 0 auto;
   margin-bottom: 1rem;
   background-color: transparent;
   width: 300px;
   border: none;
   text-align: center;
   font-size: 2rem;
   color: ${(props) =>
      props.color === 'Receita'
         ? props.theme.colors.Verdigris
         : props.theme.colors.PersianRed};
   border-bottom: 1px solid ${(props) => props.theme.colors.TimberWhite};
   outline: none;
   transition: 0.3s ease;
`;

export const Input = styled('input')`
   padding: 1rem 0.5rem;
   font-size: 1.3rem;
   color: ${(props) => props.theme.colors.White};
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
   outline: none;
`;

export const Title = styled('h2')`
   font-size: ${(props) => props.theme.fontSize.medium};
   color: #fff;
`;

export const TitleTransaction = styled('h2')`
   font-size: ${(props) => props.theme.fontSize.medium};
   color: #fff;
`;

export const ErrorMessage = styled('span')`
   font-size: ${(props) => props.theme.fontSize.small};
   color: ${(props) => props.theme.colors.PersianRed};
`;
export const SelectWrapper = styled('div')`
   display: flex;
   justify-content: space-around;
   align-items: center;
   right: 3rem;
`;

export const SelectWrapperChildren = styled('div')`
   display: flex;
   flex-direction: column;
`;

export const Label = styled('label')`
   font-size: 10px;
   width: 100%;
   margin-bottom: 9px;
   color: ${(props) => props.color || '#fff'};
`;

interface WrapperSwitchButtonProps {
   disable?: boolean;
}

export const WrapperSwitchButton = styled('div')<WrapperSwitchButtonProps>`
   display: flex;
   flex-direction: row;
   width: 100%;
   padding: 0 1rem;
   margin: 0.5rem 0;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   opacity: ${(props) => (props.disable && '0.5') || '1'};
   transition: 0.3s ease;
   pointer-events: ${(props) => (props.disable && 'none') || 'all'};
`;

interface WrapperChildrenSwitchButtonProps {
   alignItems?: string;
}

export const WrapperChildrenSwitchButton = styled(
   'div'
)<WrapperChildrenSwitchButtonProps>`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: ${(props) => props.alignItems || 'flex-start'};
   padding: 0.2rem;
   margin: 1rem 0;
   width: 100%;

   &:last-child {
      padding: 7px;
   }
`;

export const SwitchButtonLabel = styled('label')`
   font-size: ${(props) => props.theme.fontSize.small};
   margin-bottom: 0.6rem;
`;

export const SwitchRoot = styled(Switch.Root)`
   width: 42px;
   height: 25px;
   margin: 0.8rem 0;
   background-color: ${(props) => {
      if (props.checked !== false) {
         return props.theme.colors.TimberWhite;
      }

      return props.theme.colors.Dark;
   }};
   position: relative;
   border-radius: 9999px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0);

   &:focus {
      box-shadow: 0 0 0 2px black;
   }
`;

interface SwitchThumbProps {
   checked: boolean;
}

export const SwitchThumb = styled(Switch.SwitchThumb)<SwitchThumbProps>`
   display: block;
   width: 21px;
   height: 21px;
   background-color: white;
   border-radius: 9999px;
   box-shadow: 0 2px 2px #111;
   transition: transform 100ms;
   will-change: transform;
   transform: ${(props) => {
      if (!props.checked) {
         return 'translateX(2px)';
      }

      return 'translateX(19px)';
   }};
`;

interface InstallmentsAmountProps {
   disable?: boolean;
}

export const InstallmentsAmount = styled('input')<InstallmentsAmountProps>`
   display: flex;
   max-height: 50px;
   outline: none;
   padding: 1rem 0.5rem;
   font-size: 1.3rem;
   background-color: ${(props) => props.theme.colors.Dark};
   color: ${(props) => props.theme.colors.White};
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};

   opacity: ${(props) => (props.disable ? '0.5' : '1')};
`;
