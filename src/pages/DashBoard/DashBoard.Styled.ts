import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: flex;
  flex: 1;
  height: 100%;
`;

export const Menu = styled('aside')`
  background-color: ${(props) => props.theme.colors.Verdigris};
  padding: ${(props) => props.theme.space[0] - 3 + 'rem'};
`;

export const Main = styled('main')`
  display: flex;
  background-color: red;
  height: 100%;
  flex: 1;
  margin: 0 8rem;
`;
