import { useEffect, useState } from 'react';
import { handleChangeProps } from '../TransactionHeader/DashBoardHeader';

import * as S from './ThreeOptionSwitchStyles';

interface ThreeOptionSwitchProps {
   initialValue: any;
   handleChange: (value: handleChangeProps) => void;
}

export const ThreeOptionSwitch = ({
   initialValue,
   handleChange,
}: ThreeOptionSwitchProps) => {
   const [value, setValue] = useState<{ option: string }>({
      option: initialValue,
   });

   useEffect(() => {
      handleChange(value);
   }, [handleChange, value]);

   return (
      <S.MainWrapper>
         <span>||</span>
         <S.Wrapper>
            <S.Button
               selected={value.option === 'resolved'}
               onClick={() => setValue({ option: 'resolved' })}
            >
               Finalizadas
            </S.Button>
            <S.Button
               selected={value.option === 'all'}
               onClick={() => setValue({ option: 'all' })}
            >
               Todas
            </S.Button>

            <S.Button
               selected={value.option === 'subscription'}
               onClick={() => setValue({ option: 'subscription' })}
            >
               Subscription
            </S.Button>
         </S.Wrapper>
      </S.MainWrapper>
   );
};
