import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { CookiesProvider } from 'react-cookie';
import AuthContextProvider from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
