import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import GlobalStyle from "./styles/GlobalStyle"
import { theme } from './styles/DefaultTheme.ts'
import { ThemeProvider } from 'styled-components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
