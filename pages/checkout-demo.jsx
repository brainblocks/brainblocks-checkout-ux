/* @flow */

import React, { useEffect } from 'react';

import { Head } from '../components/dom/head';

const transaction = {};

transaction.payeeName = 'Apple Store';
transaction.payeeLogo = 'https://i.imgur.com/JkArT9C.png';

transaction.currency = 'usd';
transaction.amount = '0.01';

transaction.destination = 'nano_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji';

const Index = () => {

    const env = 'local';

    const onComplete = () => {
        // pass
    };

    useEffect(() => {
        if (window.brainblocks) {
            window.brainblocks.Checkout({
                env,
                transaction,
                onComplete
            }).renderTo(window.top, 'body');
        }
    }, []);

    return (
        <Head>
            <title>BrainBlocks Payments Demo</title>
        </Head>
    );
};

export default Index;
