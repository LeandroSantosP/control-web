import { Info } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as PopOver from '@radix-ui/react-popover';
import styled from 'styled-components';

export const Wrapper = styled('header')`
   display: flex;
   width: 100%;
   align-items: center;
   border-radius: 0.4rem;
   position: relative;
   min-height: 50px;
   gap: 1rem;
   background-color: ${(props) => props.theme.colors.Dark};
   padding: 0.5rem;
`;

export const TargetWrapper = styled('button')`
   width: 100px;
   height: 40px;
   border-radius: 5px;
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

export const InfosButton = styled(Info)`
   position: absolute;
   top: 0.6rem;
   right: 5px;
   cursor: pointer;

   &:hover {
      filter: brightness(1.5);
   }
`;

export const PopOverTrigger = styled(PopOver.Trigger)`
   width: 100px;
   height: 40px;
   border-radius: 5px;
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

export const DialogTrigger = styled(Dialog.Trigger)`
   width: 100px;
   height: 40px;
   border-radius: 5px;
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

export const ToggleButton = styled('button')`
   max-width: 120px;
   height: 40px;
   border-radius: 5px;
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
