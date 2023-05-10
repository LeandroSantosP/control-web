import styled from 'styled-components';

export const LoadingStyles = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #1e1d1dbf;
   z-index: 99999;
   width: 100vw;
   height: 100vh;
   position: absolute;

   img {
      width: 100px;
   }
`;
