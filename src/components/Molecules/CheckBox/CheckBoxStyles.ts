import styled from 'styled-components';

export const CheckboxRoot = styled('input')`
   background-color: white;
   width: 25px;
   height: 25px;
   border-radius: 4px;
   display: flex;
   align-items: center;
   justify-content: center;
   box-shadow: 0 2px 10px var(--blackA7);
   border: 1px solid #111;

   &:hover {
      background-color: ${(props) => props.theme.colors.Dark};
      color: #fff;
   }

   &:focus {
      box-shadow: 0 0 0 2px black;
   }
`;
