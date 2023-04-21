import { Info } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const Wrapper = styled('header')`
   display: flex;
   width: 100%;
   align-items: center;
   border-radius: 0.4rem;
   position: relative;
   min-height: 50px;
   background-color: ${(props) => props.theme.colors.Dark};
   padding: 0.5rem;
`;

export const InfosButton = styled(Info)`
   position: absolute;
   top: 5px;
   right: 5px;
   cursor: pointer;

   &:hover {
      filter: brightness(1.5);
   }
`;

export const DialogTrigger = styled(Dialog.Trigger)`
   width: 100px;
   height: 20px;
   border-radius: 5px;
   padding: 5px;
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
