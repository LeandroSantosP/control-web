import { Folder, FolderNotchOpen } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import { useTransactionContext } from '../../../shared/contexts';
import { handleChangeProps } from '../TransactionHeader/DashBoardHeader';

import * as S from './ThreeOptionSwitchStyles';

interface ThreeOptionSwitchProps {
   initialValue: any;
   month: string | null;
}

export const ThreeOptionSwitch = ({
   initialValue,
   month,
}: ThreeOptionSwitchProps) => {
   const [folderIcon, setFolderIcon] = useState(false);
   const { GetTransactionByParams } = useTransactionContext();
   const [value, setValue] = useState<{ option: string }>({
      option: initialValue,
   });

   const handleChange = useCallback(
      (value: handleChangeProps) => {
         const props = value.option;

         GetTransactionByParams({
            month: month ?? undefined,
            isSubscription:
               value.option === 'all'
                  ? undefined
                  : value.option === 'isSubscription'
                  ? 'true'
                  : 'false',
            revenue: props === 'revenue' ? 'true' : undefined,
            resolved: props === 'resolved' ? 'true' : undefined,
         });

         return;
      },
      [GetTransactionByParams, month]
   );

   useEffect(() => {
      setValue({ option: 'all' });
   }, [month]);

   useEffect(() => {
      handleChange(value);
   }, [handleChange, value]);

   return (
      <>
         <S.MainWrapper>
            {!folderIcon ? (
               <Folder
                  style={{
                     position: 'absolute',
                     right: '16.5rem',
                     top: '35%',
                  }}
                  size={20}
               />
            ) : (
               <FolderNotchOpen
                  style={{
                     position: 'absolute',
                     right: '16.5rem',
                     top: '35%',
                  }}
                  size={20}
               />
            )}
            <S.Wrapper
               onMouseOver={() => setFolderIcon(true)}
               onMouseOut={() => setFolderIcon(false)}
            >
               <S.Button
                  selected={value.option === 'isSubscription'}
                  onClick={() => setValue({ option: 'isSubscription' })}
               >
                  Inscrições
               </S.Button>
               <S.Button
                  selected={value.option === 'all'}
                  onClick={() => setValue({ option: 'all' })}
               >
                  Todas
               </S.Button>

               <S.Button
                  selected={value.option === 'isNotSubscription'}
                  onClick={() => setValue({ option: 'isNotSubscription' })}
               >
                  Recorrentes
               </S.Button>

               <S.Button
                  selected={value.option === 'revenue'}
                  onClick={() => setValue({ option: 'revenue' })}
               >
                  Receitas
               </S.Button>
               <S.Button
                  selected={value.option === 'resolved'}
                  onClick={() => setValue({ option: 'resolved' })}
               >
                  Finalizadas
               </S.Button>
            </S.Wrapper>
         </S.MainWrapper>
      </>
   );
};
