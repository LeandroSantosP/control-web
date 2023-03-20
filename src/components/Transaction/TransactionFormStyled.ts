import styled from 'styled-components';

export const Form = styled('form')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   height: 100%;
   width: 100%;
   border-radius: 1rem;
   padding: 1rem;
   font-size: 1rem;
   border: 5px solid #111;
   align-items: flex-end;
   button {
      margin-bottom: 1rem;
   }
`;

export const Input = styled('input')`
   background-color: transparent;
   width: 100%;
   border: none;
   outline: none;
`;

export const Title = styled('h2')`
   font-size: ${(props) => props.theme.fontSize.medium};
   color: #fff;
   margin: 2rem 0;
`;

export const ErrorMessage = styled('span')`
   margin-bottom: 1rem;
   font-size: ${(props) => props.theme.fontSize.small};
   color: ${(props) => props.theme.colors.PersianRed};
`;
