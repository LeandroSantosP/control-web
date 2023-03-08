import * as S from './SingUp';
import { Input } from '../../components/Inputs/BaseInput';

export const SingUp = () => {
  return (
    <S.Wrapper>
      <S.Form>
        <label htmlFor="name">Nome: </label>
        <Input placeholder="Digite algo" name="name" id="name" />
      </S.Form>
    </S.Wrapper>
  );
};
