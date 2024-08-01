import { fonts } from '@/constants';
import { Head, Html, Main, NextScript } from 'next/document';

const fontClassnames = Object.values(fonts)
  .map((font) => font.variable)
  .join(' ');

export default function Document() {
  return (
    <Html lang="en" className={fontClassnames}>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}
