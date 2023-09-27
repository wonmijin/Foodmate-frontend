import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --basic-padding: 0 120px;
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 100;
    src: url('../assets/fonts/SpoqaHanSansNeo-Thin.otf') format("otf");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 300;
    src: url('../assets/fonts/SpoqaHanSansNeo-Light.otf') format("otf");
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 400;
    src: url('../assets/fonts/SpoqaHanSansNeo-Regular.otf') format("otf");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 500;
    src: url('../assets/fonts/SpoqaHanSansNeo-Medium.otf') format("otf");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 700;
    src: url('../assets/fonts/SpoqaHanSansNeo-Bold.otf') format("woff2");
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    font-family: 'spoqa', 'sans-serif';
  }
  
  a {
    text-decoration: none;
    color: #212121;
  }
`;

export default GlobalStyle;
