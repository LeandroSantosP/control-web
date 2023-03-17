import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  list-style: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 62.5%; // 62.5% = 10px
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.White};
    background-color: ${({ theme }) => theme.colors.Dark};
    font-family:"Roboto", Helvetica, Sans-Serif;
  }
  html, body > div {
  height: 100%;

}


`;

export { GlobalStyle };
