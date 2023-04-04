import styled from 'styled-components';
import { flex } from 'styled-system';

interface PopOver {
   top: number;
   left: number;
}

export const PopOver = styled('div')<PopOver>`
   display: flex;
   background-color: '#111';
   flex-direction: row;
   width: 190px;
   height: 74px;

   padding: 0.2rem;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   border-radius: 0.8rem;
   border: 1px solid rgba(160, 160, 160, 0.46);
   position: absolute;
   overflow: hidden;
   cursor: help;
   top: ${(props) => props.top - 57}px;
   left: ${(props) => props.left - 190}px;
   animation: popover 0.2s forwards;
   transform-origin: right;

   @keyframes popover {
      from {
         transform: scaleX(0);
      }
      to {
         transform: scaleX(1.05);
      }
   }
`;

interface SubDetailsWrapperProps {
   flex: number;
}

export const SubDetailsWrapper = styled('div')<SubDetailsWrapperProps>`
   display: flex;
   flex-direction: column;
   width: 100%;
   justify-content: space-around;
   align-items: center;
   gap: 0.2rem;
   background-color: ${(props) => props.theme.colors.Dark};

   font-size: 9px;
   ${flex}

   &:first-child {
      border-right: 1px solid #fff;
   }
`;

export const Info = styled('p')`
   font-size: 9px;
   text-align: center;
`;
interface InfoProps {
   type?: string;
}

export const Type = styled('span')<InfoProps>`
   color: ${(props) => (props.type === 'expense' ? 'red' : 'green')};
`;
