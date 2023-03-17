import styled from 'styled-components';

interface BoxProps {
  JustifyContent?: string;
}

export const Box = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.JustifyContent || 'center'};
  flex: 1;
`;
