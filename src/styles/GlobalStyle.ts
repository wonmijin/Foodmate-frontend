import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
  }

  body {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }
`;

export default GlobalStyle;