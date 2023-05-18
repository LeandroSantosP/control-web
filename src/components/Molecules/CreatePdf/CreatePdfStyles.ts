import * as PopOver from '@radix-ui/react-popover';
import styled from 'styled-components';

export const PopOverContent = styled(PopOver.Content)`
   z-index: 999;
   border-radius: 4px;
   padding: 20px;
   width: 260px;
   background-color: white;
   background-color: ${(props) => props.theme.colors.TimberWhite};
   animation-duration: 400ms;
   color: ${(props) => props.theme.colors.RaisinBlack};
   animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
   will-change: transform, opacity;
`;

export const PopOverClose = styled(PopOver.Close)`
   font-family: inherit;
   border-radius: 100%;
   height: 25px;
   width: 25px;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   color: black;
   position: absolute;
   top: 5px;
   right: 5px;

   &:hover {
      color: #fff;
      background-color: black;
   }
`;

export const PopOverArrow = styled(PopOver.Arrow)`
   fill: white;
`;

export const Form = styled('form')`
   display: flex;
   flex-direction: column;
   gap: 1rem;
`;

export const Label = styled('label')`
   font-size: 1rem;
   font-weight: bold;
`;

export const Input = styled('input')`
   padding: 0.5rem 0.5rem;
   font-size: 1.3rem;
   width: 100%;
   color: ${(props) => props.theme.colors.Dark};
   background-color: ${(props) => props.theme.colors.TimberWhite};
   border: 1px solid ${(props) => props.theme.colors.Dark};
   border-radius: 0.5rem;
   outline: none;
`;

export const CheckBoxWrapper = styled('div')`
   display: flex;
   justify-content: space-evenly;
   align-items: center;
`;

export const ErrorMessage = styled('p')`
   color: ${(props) => props.theme.colors.PersianRed};
   margin-top: 10px;
   font-weight: bold;
`;
