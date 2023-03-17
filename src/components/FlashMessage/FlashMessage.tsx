import { useEffect, useState } from 'react';
import * as S from './FlashMessageStyles';

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
    if (showing) {
      const progressBar = document.querySelector('.progress-bar');
      progressBar?.classList.add('progress');
    }
  }, [showing]);

  setTimeout(() => {
    setShowing(false);
  }, timeout);

  return (
    <>
      {showing && (
        <S.Wrapper type={type}>
          {message} <S.ProgressBar time={timeout} className="progress-bar" />
        </S.Wrapper>
      )}
    </>
  );
};
