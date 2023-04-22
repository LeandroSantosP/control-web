import styled from 'styled-components';
import { Box } from '../../atoms/Box/Box';

interface WrapperProps {
   type?: 'success' | 'warning' | 'error' | 'default';
}

interface ProgressBarProps {
   time: number;
}

export const Wrapper = styled(Box)<WrapperProps>`
   width: 50px;
   z-index: 9999;
   position: absolute;
   right: 1rem;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
   top: 2rem;
   width: 300px;
   padding: 1rem;

   border-radius: 0.5rem;
   background-color: ${({ type }) =>
      (type === 'success' && '#5cb85c') ||
      (type === 'error' && '#ff3366') ||
      (type === 'warning' && '#ffcc55') ||
      (type === 'default' && '#20213b')};

   color: ${({ type }) =>
      (type === 'success' && '#000') ||
      (type === 'error' && '#000') ||
      (type === 'warning' && '#000') ||
      (type === 'default' && '#fff')};

   gap: 10px;
   border: 1px solid #000;
   animation: popover 0.6s ease-in-out;
   animation-fill-mode: forwards;

   @keyframes popover {
      0% {
         opacity: 0;
         transform: scale(0);
      }
      50% {
         opacity: 1;
         transform: scale(1.05);
      }
      100% {
         transform: scale(1);
      }
   }
`;

export const ContentMessage = styled('p')<WrapperProps>`
   font-size: 1rem;
   color: ${({ type }) =>
      (type === 'success' && '#000') ||
      (type === 'error' && '#000') ||
      (type === 'warning' && '#000') ||
      (type === 'default' && '#fff')};
`;

export const ButtonWrapper = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 0.3rem;
   height: 100%;
   flex-direction: column;
   gap: 1rem;
   text-align: center;

   div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      width: 100%;
   }
`;

export const Button = styled('button')`
   display: flex;
   flex-direction: row;
   border: none;
   width: 60px;
   color: ${(props) => props.theme.colors.TimberWhite};
   justify-content: center;
   outline: none;
   border-radius: 0.3rem;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   padding: 0.5rem 0.3rem;
`;
