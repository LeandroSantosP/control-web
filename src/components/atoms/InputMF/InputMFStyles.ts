import styled from 'styled-components';

interface InputProps {
   fontSize: string;
}

export const Input = styled('input')<InputProps>`
   outline: none;
   border: none;
   color: ${(props) => props.theme.colors.TimberWhite};
   background-color: transparent;
   width: 150px;
   font-size: 2rem;
   border-bottom: 1px solid ${(props) => props.theme.colors.TimberWhite};
   text-align: center;
   margin-bottom: 20px;
`;
