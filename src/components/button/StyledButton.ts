import styled from 'styled-components';

interface ButtonProps {
  fontSize: 'small' | 'medium' | 'large';
}

const ButtonStyled = styled.button<ButtonProps>`
  background-color: transparent;
  border: 1px solid #fff;
  font-size: ${(props) => props.theme.fontSize[props.fontSize]};
  max-width: 140px;
  padding: 12px 18px;
  color: #fff;
  cursor: pointer;
  border-radius: 200px;
  margin: 2rem 0;
`;

export { ButtonStyled };
