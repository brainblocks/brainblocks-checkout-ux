/* @flow */

import React, { type Element } from 'react';
import Head from 'next/head';

export function Script({ src, onLoad } : { src : string, onLoad : Function }) : Element<*> {

    if (global.__mock_scripts__ && global.__mock_scripts__[src]) {
        global.__mock_scripts__[src]({ src, onLoad });
    }

    return (
        <Head>
            <script src={ src } onLoad={ onLoad } />
        </Head>
    );
}
