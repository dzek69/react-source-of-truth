import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>react-source-of-truth</title>
        </Head>
        <Component {...pageProps} />
    </>
);

export default MyApp;
