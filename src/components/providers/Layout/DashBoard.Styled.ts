import styled from 'styled-components';

import { Command, ChartBar, SignOut } from '@phosphor-icons/react';

export const Out = styled(SignOut)`
   cursor: pointer;
   transition: 0.3s ease-out;
   color: ${(props) => props.theme.colors.Verdigris};

   &:hover {
      color: ${(props) => props.theme.colors.White};
   }
`;

export const Graph = styled(ChartBar)`
   cursor: pointer;
   transition: 0.3s ease-out;
   color: ${(props) => props.theme.colors.Verdigris};

   &:hover {
      color: ${(props) => props.theme.colors.White};
   }
`;

export const Dash = styled(Command)`
   cursor: pointer;
   transition: 0.3s ease-out;
   color: ${(props) => props.theme.colors.Verdigris};

   &:hover {
      color: ${(props) => props.theme.colors.White};
   }
`;

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
   width: 70px;
`;

export const Logo = styled('img')`
   width: 110%;
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
   flex-direction: column;
   height: 100%;
   flex: 1;
   max-width: 1000px;
   margin: 0 auto;
   padding: 1rem;
`;
