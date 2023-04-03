import * as Popover from '@radix-ui/react-popover';
import { TransactionListItemProps } from '../TransactionListItem/TransactionListItem';
import * as S from './TransactionDetailsStyles';

export const TransactionDetails = ({
   params,
}: {
   params?: TransactionListItemProps;
}) => {
   return (
      <>
         <Popover.Root>
            <Popover.Trigger>X</Popover.Trigger>
            <Popover.Portal>
               <S.PopoverContent>
                  <h1>OI</h1>
               </S.PopoverContent>
            </Popover.Portal>
         </Popover.Root>
      </>
   );
};
