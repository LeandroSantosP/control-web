import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  list-style: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

    ::-webkit-scrollbar {
  background-color: ${(props) =>
     props.theme.colors.Dark}; /* cor de fundo do scroll */
  width: 8px; /* largura do scroll vertical */
  border-radius:   1rem;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc; /* cor do "polegar" do scroll */
  border-radius: 5px; /* borda arredondada do "polegar" */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #aaa; /* cor do "polegar" do scroll quando o mouse está sobre ele */
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
}

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 62.5%; // 62.5% = 10px
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.TimberWhite};
    background-color: ${({ theme }) => theme.colors.Dark};
    background-image: url("../src/shared/assets/sparks.svg");
    font-family:"Roboto", Helvetica, Sans-Serif;
  }
  html, body > div {
  height: 100%;
}

`;

export { GlobalStyle };
