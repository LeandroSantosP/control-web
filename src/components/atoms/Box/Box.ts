import styled from 'styled-components';
import {
   color,
   width,
   height,
   space,
   borderRadius,
   border,
   display,
   margin,
} from 'styled-system';

interface BoxProps {
   JustifyContent?:
      | 'center'
      | 'flex-end'
      | 'flex-start'
      | 'space-between'
      | 'space-around';
   flexDirection?: 'column' | 'row';
   alignItems?: 'center' | 'flex-end' | 'flex-start';
   gap?: string;
   bg?: string;
   width?: string;
   height?: string;
   m?: string;
   p?: string;
   borderRadius?: string;
   border?: string;
   flex?: string;
   display?: string;
   margin?: string;
}

export const Box = styled.div<BoxProps>`
   display: flex;
   ${display}
   ${border}
   ${borderRadius}
   ${color}
   ${space}
   ${height}
   ${width}
   ${margin}

   gap: ${(props) => props.gap};
   align-items: ${(props) => props.alignItems || 'center'};
   flex-direction: ${(props) => props.flexDirection || 'row'};
   align-items: ${(props) => props.alignItems || 'center'};
   justify-content: ${(props) => props.JustifyContent || 'center'};
`;
