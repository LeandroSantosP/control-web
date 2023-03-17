import { Layout } from '../../components/Layout';
import * as S from './DashBoardStyled';

export const DashBoard = () => {
  return (
    <Layout>
      {/* <h1> + DashBoard</h1> */}
      <S.DashboardWrapper>
        <S.TransactionHeader>
          <h2>Transações</h2>
          <S.AddButton>+</S.AddButton>
        </S.TransactionHeader>
        <S.UlWrapper>
          <S.TransactionItemLi>
            <S.TransactionContent>
              <h3>Conta A</h3> <span> category</span>
            </S.TransactionContent>
            <S.TransactionContent>
              <h3>- RS 50</h3>
              <span>Nao Paga</span>
            </S.TransactionContent>
          </S.TransactionItemLi>
          <S.Divider />
          <S.TransactionItemLi>
            <S.TransactionContent>
              <h3>Conta A</h3> <span> category</span>
            </S.TransactionContent>
            <S.TransactionContent>
              <h3>- RS 50</h3>
              <span>Nao Paga</span>
            </S.TransactionContent>
          </S.TransactionItemLi>
        </S.UlWrapper>
        <S.Divider />
      </S.DashboardWrapper>
    </Layout>
  );
};
