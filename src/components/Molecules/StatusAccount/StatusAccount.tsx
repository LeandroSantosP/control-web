import { toMoney } from 'vanilla-masker';
import { Divider } from '../../atoms/Divider/Divider';
import * as S from './StatusAccountStyles';

interface StatusAccountProps {
   Logo: string;
   alt: string;
   description: string;
   amount: string;
}

export const StatusAccount = ({
   Logo,
   alt,
   amount,
   description,
}: StatusAccountProps) => {
   const TotalAmount = toMoney(amount, { unit: 'R$' });

   return (
      <>
         <S.StatusContainer>
            <S.WalletImage src={Logo} alt={alt} />
            <Divider width="90%" bg="rgba(160, 160, 160, 0.46)" height="1px" />
            <S.BalenseWrapper>
               <S.CurrentBalense>{description}</S.CurrentBalense>
               <S.Amount isNegative={Number(amount) < 0}>
                  {Number(amount) < 0 && '-'}
                  {TotalAmount}
               </S.Amount>
            </S.BalenseWrapper>
         </S.StatusContainer>
      </>
   );
};
