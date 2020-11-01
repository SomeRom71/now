import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Header from '../containers/layouts/header';

import '../assets/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Now! - World dating service</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
