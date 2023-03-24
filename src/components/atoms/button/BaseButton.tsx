import React from 'react';
import * as S from './StyledButton';
interface ButtonPros extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   ISdisabled?: boolean;
   fontSize: 'small' | 'medium' | 'large';
   bg?: string;
}

function Button({
   children,
   ISdisabled = false,
   fontSize,
   bg,
   ...props
}: ButtonPros) {
   return (
      <S.ButtonStyled
         ISdisabled={ISdisabled}
         disabled={ISdisabled}
         fontSize={fontSize}
         bg={bg}
         {...props}
      >
         {children}
      </S.ButtonStyled>
   );
}

export { Button };
