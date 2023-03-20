import styled from 'styled-components';
import { Box } from '../../atoms/Box/Box';

interface WrapperProps {
   type?: 'success' | 'warning' | 'error' | 'default';
}

interface ProgressBarProps {
   time: number;
}

export const Wrapper = styled(Box)<WrapperProps>`
   z-index: 9999;
   position: absolute;
   right: 1rem;
   top: 2rem;
   width: 300px;
   height: 80px;
   color: #fff;
   font-size: ${(props) => props.theme.fontSize.small};
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

   border: 1px solid #000;
`;

export const ProgressBar = styled('div')<ProgressBarProps>`
   height: 4px;
   background-color: #fff;
   border-radius: 1rem;
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   width: 0%;
   transition: width ${(props) => props.time / 1000}s linear;
   &.progress {
      width: 100%;
   }
`;
