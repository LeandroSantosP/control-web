import React from 'react';
import * as S from './StyledButton';
interface ButtonPros extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fontSize: 'small' | 'medium' | 'large';
}

function Button({ children, fontSize, ...props }: ButtonPros) {
  return (
    <S.ButtonStyled fontSize={fontSize} {...props}>
      {children}
    </S.ButtonStyled>
  );
}

export { Button };
