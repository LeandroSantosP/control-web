import { useEffect, useState } from 'react';
import * as S from './FlashMessageStyles';
import { Warning, SealWarning } from '@phosphor-icons/react';

interface FlashMessageProps {
   message?: string;
   type?: 'success' | 'warning' | 'error' | 'default';
   timeout?: number;
}

export const FlashMessage = ({
   message = 'Digite um mensagem',
   type = 'default',
   timeout = 2000,
}: FlashMessageProps) => {
   const [showing, setShowing] = useState(true);

   useEffect(() => {
      const progressBar = document.querySelector('.progress-bar');
      progressBar?.classList.add('progress');
   }, [showing]);

   setTimeout(() => {
      setShowing(false);
   }, timeout);

   return (
      <>
         {showing && (
            <S.Wrapper type={type}>
               {type === 'warning' && <Warning size={40} />}
               {type === 'default' && <Warning size={40} />}
               {type === 'success' && <Warning size={40} />}
               {type === 'error' && <SealWarning size={40} />}
               {message}{' '}
               <S.ProgressBar time={timeout} className="progress-bar" />
            </S.Wrapper>
         )}
      </>
   );
};
