import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../theme';

import { UserProvider } from '@auth0/nextjs-auth0';
import { TodosProvider } from '../contexts/TodoContext';

import Header from '../components/Header';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <TodosProvider>
        <ChakraProvider theme={customTheme}>
          <Head>
            <title>Awesome ToDo </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </TodosProvider>
    </UserProvider>
  );
}

export default MyApp;
