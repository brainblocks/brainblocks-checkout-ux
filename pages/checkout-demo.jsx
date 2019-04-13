/* @flow */

import React, { useEffect } from 'react';

import { Head } from '../components/head';

const transaction = {};

if (Math.random() < 0.3) {
    transaction.payeeName = 'Apple Store';
    transaction.payeeLogo = 'https://i.imgur.com/JkArT9C.png';
} else if (Math.random() < 0.7) {
    transaction.payeeName = 'Amazon';
    transaction.payeeLogo = 'https://i.imgur.com/AW14Qak.png';
} else {
    transaction.payeeName = 'eBay';
}

if (Math.random() < 0.3) {
    transaction.currency = 'usd';
} else if (Math.random() < 0.3) {
    transaction.currency = 'eur';
} else {
    transaction.currency = 'nano';
}

transaction.amount = `${ Math.floor(Math.random() * 100) }.${ Math.floor(Math.random() * 100) }`;
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
