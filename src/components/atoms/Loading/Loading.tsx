import spinner from '../../../shared/assets/spinner.svg';
import * as S from './LoadingStyle';

export const Loading = (params: { loading: boolean }) => {
   return (
      <>
         {params.loading && (
            <S.LoadingStyles>
               <img
                  src={spinner}
                  alt="Tres bolinhas no centro da tela indicando a carregamento da criação de perfil"
               />
            </S.LoadingStyles>
         )}
      </>
   );
};
