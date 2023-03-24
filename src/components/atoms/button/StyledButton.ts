import styled from 'styled-components';
import { color } from 'styled-system';

interface ButtonProps {
   fontSize: 'small' | 'medium' | 'large';
   ISdisabled: boolean;
   bg?: string;
}

const ButtonStyled = styled.button<ButtonProps>`
   border: 1px solid #fff;
   font-size: ${(props) => props.theme.fontSize[props.fontSize]};
   max-width: 140px;
   padding: 12px 18px;
   ${color}
   cursor: ${(props) => (props.ISdisabled ? 'normal' : 'pointer')};
   border-radius: 200px;
   opacity: ${(props) => props.ISdisabled && 0.5};
   margin: 2rem 0;
`;

export { ButtonStyled };
