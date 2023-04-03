import { Box } from '../../atoms/Box/Box';
import { Icon } from '../../atoms/Icons/Icon';
import * as S from './DashBoardHeaderStyles';
import { SelectCustom } from '../Select/Select';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BalenseLogo from '../../../shared/assets/balense.png';
import { useTransactionContext } from '../../../shared/contexts';
import { ThreeOptionSwitch } from '../ThreeOptionSwitch/ThreeOptionSwitch';

export interface handleChangeProps {
   option: string;
}

export const DashBoardHeader = ({
   title,
   icon,
   hasFilter = true,
}: {
   title: string;
   icon?: any;
   hasFilter?: boolean;
}) => {
   const { GetTransaction, GetTransactionBySubscription } =
      useTransactionContext();

   const [searchParams, setSearchParams] = useSearchParams({
      month: 'all',
   });

   const [month, setMonth] = useState(searchParams.get('month'));

   const monthlyList = [
      { value: '1', Name: 'Janeiro' },
      { value: '2', Name: 'Fevereiro' },
      { value: '3', Name: 'Março' },
      { value: '4', Name: 'Abril' },
      { value: '5', Name: 'Maio' },
      { value: '6', Name: 'Junho' },
      { value: '7', Name: 'Julho' },
      { value: '8', Name: 'Agosto' },
      { value: '9', Name: 'Setembro' },
      { value: '10', Name: 'Outubro' },
      { value: '11', Name: 'novembro' },
      { value: '12', Name: 'Dezembro' },
   ];

   useEffect(() => {
      if (month === 'all') {
         GetTransaction({});
         setSearchParams({});
         return;
      }
      if (month) {
         setSearchParams({ month });
         setTimeout(() => {
            GetTransaction({ month });
         }, 1);
         return;
      }
   }, [GetTransaction, GetTransactionBySubscription, month, setSearchParams]);

   return (
      <Box
         p="1rem"
         m="1rem 0"
         flexDirection="row"
         border="2px solid #000"
         borderRadius="1rem"
         width="100%"
         alignItems="center"
         gap="2rem"
         position="relative"
      >
         <S.Title>
            {icon && <Icon currentIcon={icon} />}
            {title}
         </S.Title>

         <ThreeOptionSwitch initialValue={'all'} month={month} />
         {hasFilter && (
            <div style={{ marginRight: '5rem' }}>
               <SelectCustom
                  haveDefaultValue={true}
                  setCurrentValue={setMonth}
                  currentValue={month || 'Todas as transações'}
                  fieldList={monthlyList}
               />
            </div>
         )}

         <S.UserImage>
            <img src={BalenseLogo} style={{ width: '20px' }} />
         </S.UserImage>
      </Box>
   );
};
