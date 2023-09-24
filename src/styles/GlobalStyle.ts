import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --basic-padding: 0 120px;
  }

  @font-face {
    font-family: "spoqa";
    src: url('../assets/fonts/SpoqaHanSansNeo-Medium.otf');
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
