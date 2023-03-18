import styled from 'styled-components';

interface ButtonProps {
   fontSize: 'small' | 'medium' | 'large';
   ISdisabled: boolean;
}

const ButtonStyled = styled.button<ButtonProps>`
   background-color: #ccc;
   border: 1px solid #fff;
   font-size: ${(props) => props.theme.fontSize[props.fontSize]};
   max-width: 140px;
   padding: 12px 18px;
   color: ${(props) => props.theme.colors.Dark};
   cursor: pointer;
   border-radius: 200px;
   opacity: ${(props) => props.ISdisabled && 0.5};

   margin: 2rem 0;
`;

export { ButtonStyled };
