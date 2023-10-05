import { createGlobalStyle } from 'styled-components';
import Bold2 from '../assets/fonts/SpoqaHanSansNeo-Bold.woff2'
import Bold from '../assets/fonts/SpoqaHanSansNeo-Bold.woff'
import Regular2 from '../assets/fonts/SpoqaHanSansNeo-Regular.woff2'
import Regular from '../assets/fonts/SpoqaHanSansNeo-Regular.woff'
import Light2 from '../assets/fonts/SpoqaHanSansNeo-Light.woff2'
import Light from '../assets/fonts/SpoqaHanSansNeo-Light.woff'
import Thin2 from '../assets/fonts/SpoqaHanSansNeo-Thin.woff2'
import Thin from '../assets/fonts/SpoqaHanSansNeo-Thin.woff'


export const GlobalStyle = createGlobalStyle`
  :root {
    --basic-padding: 0 120px;
  }
  @font-face {
    font-family: 'SpoqaHanSans';
    font-weight: 700;
    src: local(''),
    url('${Bold2}') format('woff2'),
    url('${Bold}') format('woff'),
}

@font-face {
    font-family: 'SpoqaHanSans';
    font-weight: 400;
    src: local(''),
    url('${Regular2}') format('woff2'),
    url('${Regular}') format('woff'),
}

@font-face {
    font-family: 'SpoqaHanSans';
    font-weight: 300;
    src: local(''),
    url('${Light2}') format('woff2'),
    url('${Light}') format('woff'),
}

@font-face {
    font-family: 'SpoqaHanSans';
    font-weight: 100;
    src: local(''),
    url('${Thin2}') format('woff2'),
    url('${Thin}') format('woff'),
}

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    font-family: 'SpoqaHanSans', sans-serif;
  }
  
  a {
    text-decoration: none;
    color: #212121;
  }
`;

export default GlobalStyle;
