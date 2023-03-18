import styled from 'styled-components';

interface InputStylesProps {
   fontSize: 'small' | 'medium' | 'large';
}

export const Input = styled.input<InputStylesProps>`
   background-color: transparent;
   border-radius: 200px;

   height: 45px;
   color: #fff;
   border: 1px solid #fff;
   font-size: ${(props) => props.theme.fontSize[props.fontSize]};
   padding: 12px 18px;
`;
