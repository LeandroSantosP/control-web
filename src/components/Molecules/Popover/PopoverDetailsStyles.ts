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

   padding: 0.2rem;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   border-radius: 0.8rem;
   border: 1px solid rgba(160, 160, 160, 0.46);
   position: absolute;
   overflow: hidden;
   cursor: help;
   z-index: 15;
   top: ${(props) => props.top - 57}px;
   left: ${(props) => props.left - 350}px;
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
   align-items: center;
   padding: 1.5rem;
   background-color: ${(props) => props.theme.colors.Dark};
   justify-content: center;
   font-size: 0.8rem;
   ${flex}

   &:first-child {
      border-right: 1px solid ${(props) => props.theme.colors.TimberWhite};
   }
`;

export const FinishedButton = styled('button')`
   padding: 8px 5px;
   cursor: pointer;
   border: none;
   border-radius: 0.3rem;
   top: 0.5rem;
   font-size: 0.6rem;
   background-color: #ffaa22;
   margin-left: 8px;
   color: ${(props) => props.theme.colors.RaisinBlack};

   &:hover {
      filter: brightness(1.2);
   }
`;

export const Info = styled('p')`
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   padding: 10px;
   width: 100%;
   border-radius: 10px;
   text-align: center;
   margin: 3px;

   font-size: 1rem;
`;

export const Total = styled('span')`
   display: flex;
   justify-content: center;
   align-content: center;
   flex-direction: column;
   font-size: 10px;
   min-width: 50%;
   font-size: 1rem;
`;

export const Type = styled('span')`
   color: ${(props) => props.theme.colors.TimberWhite};
`;

export const SubContent = styled('div')`
   display: flex;
   flex-direction: column;
   text-align: flex-start;
`;
