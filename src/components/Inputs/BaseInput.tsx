import styled from 'styled-components';

interface InputStylesProps {
  fontSize: 'small' | 'medium' | 'large';
}

const InputStyles = styled('input')<InputStylesProps>`
  background-color: transparent;
  border-radius: 200px;
  height: 45px;
  color: #fff;
  border: 1px solid #fff;
  font-size: ${(props) => props.theme.fontSize[props.fontSize]};
  padding: 12px 8px;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fontSize?: 'small' | 'medium' | 'large';
}

export const Input = ({ fontSize = 'medium', ...props }: InputProps) => {
  return <InputStyles fontSize={fontSize} {...props} />;
};
