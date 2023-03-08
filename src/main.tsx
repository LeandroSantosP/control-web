import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Theme } from './components/theme';
import { GlobalStyle } from './global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme>
      <App />
      <GlobalStyle />
    </Theme>
  </React.StrictMode>
);
