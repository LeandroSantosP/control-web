import styled from 'styled-components';
import * as Popover from '@radix-ui/react-popover';
import { style } from 'styled-system';

export const HouverContainer = styled('div')`
   position: absolute;
   min-width: 100%;
   min-height: 100%;
   background-color: blue;
`;

export const PopoverContent = styled(Popover.Content)`
   min-width: 360px;
   height: 200px;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   border-radius: 1rem;
   border: 1px solid red;
`;

export const PopoverPortal = styled(Popover.Portal)`
   display: flex;
   min-width: 360px;
   height: 200px;
   flex-direction: column;
   justify-content: center;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   border-radius: 1rem;
   border: 1px solid red;
`;

export const PopoverArrow = styled(Popover.Arrow)`
   background-color: red;
`;
