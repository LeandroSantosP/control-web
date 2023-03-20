import styled from 'styled-components';

interface BoxProps {
   JustifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-between';
   flexDirection?: 'column' | 'row';
   alignItems?: 'center' | 'flex-end' | 'flex-start';
}

export const Box = styled.div<BoxProps>`
   width: 100%;
   height: 100%;
   display: flex;
   align-items: ${(props) => props.alignItems || 'center'};
   flex-direction: ${(props) => props.flexDirection || 'center'};
   align-items: ${(props) => props.alignItems || 'center'};
   justify-content: ${(props) => props.JustifyContent || 'center'};
`;
