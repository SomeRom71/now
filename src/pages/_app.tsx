import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import firebase from 'firebase';
import { store } from '../store';
import { FIREBASE_CONFIG } from '../constants/api-constants';
import Header from '../containers/layouts/header';
import GlobalWrap from '../components/global-wrap';
import '../assets/main.scss';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Now! - World dating service</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalWrap>
        <Header />
        <Component {...pageProps} />
      </GlobalWrap>
    </Provider>
  );
}

export default MyApp;
