import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Theme } from './components/providers/theme';
import { AuthProvider } from './shared/contexts/AuthContext';
import { GlobalStyle } from './global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <AuthProvider>
         <Theme>
            <App />
            <GlobalStyle />
         </Theme>
      </AuthProvider>
   </React.StrictMode>
);
