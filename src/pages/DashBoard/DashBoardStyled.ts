import styled from 'styled-components';

export const DashboardWrapper = styled('section')`
   display: flex;
   flex-direction: column;
   flex: 1;
   overflow-y: scroll;

   ::-webkit-scrollbar {
      background-color: #000; /* cor de fundo do scroll */
      border-radius: 0 1rem 1rem 0;
   }

   max-height: 500px;
   padding: 1rem;
   border-radius: 1rem 0 0 1rem;
   background-color: #000;
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

export const Divider = styled('div')`
   width: 100%;
   height: 1px;

   &:not(:last-child) {
      background-color: rgba(255, 255, 255, 0.36);
      border-radius: 1rem;
   }
`;
