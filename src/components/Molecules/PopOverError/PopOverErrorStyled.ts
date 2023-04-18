import * as PopOver from '@radix-ui/react-popover';
import styled from 'styled-components';

export const PopOverRoot = styled(PopOver.Root)``;
export const PopOverPortal = styled(PopOver.Portal)``;
export const PopOverTrigger = styled(PopOver.Trigger)``;
export const PopOverArrow = styled(PopOver.Arrow)`
   fill: ${(props) => props.theme.colors.RaisinBlack};
`;
export const PopOverContent = styled(PopOver.Content)`
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 4px;
   width: 160px;
   padding: 10px;
   height: 35px;
   z-index: 99999;
   background-color: ${(props) => props.theme.colors.TimberWhite};
   animation-duration: 400ms;
   animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
`;

export const Text = styled('p')`
   font-size: 0.8rem;
   width: 100%;
   font-weight: 500;
   color: ${(props) => props.theme.colors.RaisinBlack};
`;
