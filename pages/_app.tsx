import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps ) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
       <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
