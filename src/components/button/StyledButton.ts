import styled from 'styled-components';
import { BaseButton } from './BaseButton';

interface ButtonProps {
  fontSize: 'small' | 'medium' | 'large';
}

const Button = styled(BaseButton)<ButtonProps>`
  background-color: red;
`;

export { Button };
