import { useEffect, useState } from 'react';
import * as S from './FlashMessageStyles';
import { Warning, SealWarning } from '@phosphor-icons/react';

interface FlashMessageProps {
   message?: string;
   type?: 'success' | 'warning' | 'error' | 'default';
   haveButton?: boolean;
   handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
   FistButtonText?: string;
   SecondButtonText?: string;
}

export const FlashMessage = ({
   message = 'Digite um mensagem',
   type = 'default',
   haveButton,
   handleClick,
   FistButtonText = 'Clicar',
   SecondButtonText = 'Clicar',
}: FlashMessageProps) => {
   return (
      <>
         <S.Wrapper type={type}>
            {type === 'warning' && <Warning size={40} />}
            {type === 'default' && <Warning size={40} />}
            {type === 'success' && <Warning size={40} />}
            {type === 'error' && <SealWarning size={40} />}

            {haveButton ? (
               <S.ButtonWrapper>
                  <S.ContentMessage>{message}</S.ContentMessage>
                  <div>
                     <S.Button onClick={handleClick}>{FistButtonText}</S.Button>
                     <S.Button onClick={handleClick}>
                        {SecondButtonText}
                     </S.Button>
                  </div>
               </S.ButtonWrapper>
            ) : (
               <S.ContentMessage>{message}</S.ContentMessage>
            )}
         </S.Wrapper>
      </>
   );
};
