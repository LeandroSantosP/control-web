import styled from 'styled-components';

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
   margin: 0 auto;
   width: 450px;
   height: 600px;
   left: 50%;
   top: 50%;
   background-color: red;
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
   font-size: 15px;
   line-height: 1.5;
`;
