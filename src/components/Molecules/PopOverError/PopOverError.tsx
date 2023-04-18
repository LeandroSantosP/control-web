import * as S from './PopOverErrorStyled';

export function PopOverError({ message }: { message: string | undefined }) {
   return (
      <S.PopOverRoot open={true}>
         <S.PopOverTrigger />
         <S.PopOverPortal>
            <S.PopOverContent>
               <S.Text>{message}</S.Text>
               <S.PopOverArrow />
            </S.PopOverContent>
         </S.PopOverPortal>
      </S.PopOverRoot>
   );
}
