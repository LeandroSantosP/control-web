import styled from 'styled-components';

interface InputProps {
   active?: boolean;
   bg?: string;
   bx?: string;
   pc?: string;
   cl?: string;
}

export const Input = styled('input')<InputProps>`
   height: 40px;
   background-color: #ccc;
   opacity: ${(props) => (props.active ? 0.5 : 1)};
   font-size: 1rem;
   font-weight: 600;
   border-radius: 5px;
   box-shadow: ${(props) => (props.bx ? props.bx : 'none')};
   border: none;
   outline: none;
   padding: 10px;
   color: ${(props) => (props.cl ? props.cl : props.theme.colors.Dark)};

   &::placeholder {
      color: ${(props) =>
         props.pc ? props.pc : props.theme.colors.TimberWhite};
   }
`;
