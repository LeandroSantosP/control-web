import React from 'react';
import * as S from './StyledButton';
interface ButtonPros extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ISdisabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

function Button({ children, ISdisabled, fontSize, ...props }: ButtonPros) {
  return (
    <S.ButtonStyled ISdisabled={ISdisabled} fontSize={fontSize} {...props}>
      {children}
    </S.ButtonStyled>
  );
}

export { Button };
