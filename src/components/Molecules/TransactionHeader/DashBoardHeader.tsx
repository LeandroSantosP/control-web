import { Box } from '../../atoms/Box/Box';
import { Icon } from '../../atoms/Icons/Icon';
import * as S from './DashBoardHeaderStyles';
import { SelectCustom } from '../Select/Select';
import { useEffect, useState } from 'react';
import BalenseLogo from '../../../shared/assets/balense.png';
import { useTransactionContext } from '../../../shared/contexts';

export const DashBoardHeader = ({
   title,
   icon,
   hasFilter = true,
}: {
   title: string;
   icon?: any;
   hasFilter?: boolean;
}) => {
   const { GetTransaction } = useTransactionContext();
   const [month, setMonth] = useState();

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
      GetTransaction({ month });
   }, [GetTransaction, month]);

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
         {hasFilter && (
            <div style={{ marginRight: '5rem' }}>
               <SelectCustom
                  setCurrentValue={setMonth}
                  currentValue={month}
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
