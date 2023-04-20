import { useEffect, useState } from 'react';
import * as S from './ProgressStyles';

export function Progress() {
   const [progress, setProgress] = useState(0);
   useEffect(() => {
      const timer = setInterval(() => setProgress(90), 200);

      return () => clearTimeout(timer);
   }, []);
   return (
      <S.ProgressRoot value={progress}>
         <S.ProgressIndicator
            style={{ transform: `translateX(-${progress}%)` }}
         />
      </S.ProgressRoot>
   );
}
