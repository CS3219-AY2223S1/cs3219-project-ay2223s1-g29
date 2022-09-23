import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { CookiesProvider } from 'react-cookie';
import AuthContextProvider from './context/AuthContext';
import ApiServiceContextProvider from './context/ApiServiceContext';
import ENV from './env';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthContextProvider>
        <ApiServiceContextProvider svcType={ENV.API_TYPE}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </ApiServiceContextProvider>
      </AuthContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
