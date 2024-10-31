import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { Api } from '@/apis';
import { Authenticator, ChakraProvider, LayoutProvider, ModalProvider, ReactQueryProvider, Translator } from '@/components';

export default function App({ Component, pageProps : { session, ...pageProps }}: AppProps) {
  useEffect(() => {
    Api.init();
  }, []);

  return (
    <ReactQueryProvider>
      <SessionProvider session={session}>
        <ChakraProvider>
          <Translator>
            <Authenticator />
            <ModalProvider />
            <LayoutProvider>
              <Component {...pageProps} />
            </LayoutProvider>
          </Translator>
        </ChakraProvider>
      </SessionProvider>
    </ReactQueryProvider>
  );
}
