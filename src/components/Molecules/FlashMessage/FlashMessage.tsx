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
   timeout = 0,
}: FlashMessageProps) => {
   const [progress, setProgress] = useState(0);
   const numUpdates = 100;
   const updateInterval = timeout / numUpdates;

   useEffect(() => {
      const timer = setTimeout(() => {
         if (progress < 100) {
            setProgress(progress + 10);
         }
      }, updateInterval);

      return () => clearTimeout(timer);
   }, [progress, updateInterval]);

   return (
      <>
         <S.Wrapper type={type}>
            {type === 'warning' && <Warning size={40} />}
            {type === 'default' && <Warning size={40} />}
            {type === 'success' && <Warning size={40} />}
            {type === 'error' && <SealWarning size={40} />}
            {message}
            {/* <S.ProgressBar time={progress} className="progress-bar" /> */}
         </S.Wrapper>
      </>
   );
};
