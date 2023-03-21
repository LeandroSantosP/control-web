import styled from 'styled-components';
import { width, color, height } from 'styled-system';

interface DividerProps {
   bg?: string;
   color?: string;
   width?: string;
   height?: string;
}

export const Divider = styled('div')<DividerProps>`
   ${width}
   ${height}
   border-radius: 50%;
   &:not(:last-child) {
      ${color}
      border-radius: 1rem;
   }
`;
