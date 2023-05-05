import styled from 'styled-components';
import { flex } from 'styled-system';

interface DashboardWrapperProps {
   flex?: number;
   flexDirection?: string;
   gap?: string;
   overflowY?: string;
   background?: string;
   width?: string;
}

export const Wrapper = styled('div')`
   display: flex;
   flex-direction: row;
   gap: 1rem;
   height: 100%;
   width: 100%;
`;

export const DashboardWrapper = styled('section')<DashboardWrapperProps>`
   display: flex;
   flex-direction: ${(props) => props.flexDirection || 'column'};
   overflow-y: ${(props) => props.overflowY || 'scroll'};
   gap: ${(props) => props.gap};

   ${flex}

   ::-webkit-scrollbar {
      background-color: #000; /* cor de fundo do scroll */
      border-radius: 0 1rem 1rem 0;
   }

   height: 100%;
   padding: 1rem;
   border-radius: 0.8rem;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
`;

export const StatusWrapper = styled('div')<DashboardWrapperProps>`
   ${flex}
   display: flex;
   flex-direction: ${(props) => props.flexDirection || 'column'};
   height: 100%;
   gap: 1rem;
   background-color: ${(props) => props.background};
   width: ${(props) => props.width};
`;

export const TransactionHeader = styled('section')`
   display: flex;
   width: 100%;
   justify-content: space-between;
   align-items: center;

   h2 {
      font-size: ${(props) => props.theme.fontSize.medium};
   }
`;

export const AddButton = styled('button')`
   border: none;
   background: rgba(255, 255, 255, 0.36);
   border-radius: 4px;
   width: 50px;
   padding: 0.5rem;
   cursor: pointer;
   transition: 0.1s ease-in;

   &:hover {
      background-color: #eee;
   }
`;

export const UlWrapper = styled('ul')`
   display: flex;
   flex-direction: column;
   flex: 1;
`;
