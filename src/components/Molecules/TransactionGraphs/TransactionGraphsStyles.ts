import styled from 'styled-components';

export const WrapperMain = styled('section')`
   display: flex;
   height: 100%;
   position: relative;
`;

export const ToggleButton = styled('button')`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   background-color: ${(props) => props.theme.colors.Dark};
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
   padding: 0.2rem;
   top: 0;
   border-radius: 0.3rem;
   z-index: 1;
   cursor: pointer;
   &:hover {
      filter: brightness(1.9);
   }
`;
