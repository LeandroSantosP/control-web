import styled from 'styled-components';

export const Wrapper = styled('div')`
   display: flex;
   flex: 1;
   height: 100%;
`;

export const Menu = styled('aside')`
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   padding: ${(props) => props.theme.space[0] - 3 + 'rem'};
   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const Logo = styled('img')`
   width: 90px;
`;

export const MenuContent = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   justify-content: space-around;
   flex: 1;
`;

export const WrapperOptions = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 2rem;
`;

export const Main = styled('main')`
   display: flex;
   height: 100%;
   flex: 1;
   max-width: 900px;
   margin: 0 auto;
   padding: 1rem;
`;
