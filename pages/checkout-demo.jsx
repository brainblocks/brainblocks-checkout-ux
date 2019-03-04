/* @flow */

import React, { useEffect } from 'react';
import Head from 'next/head';

import { useBrainBlocksScript } from '../hooks';

const Index = () => {

    const env = 'local';
    
    const transaction = {
        currency:    'nano',
        amount:      '1000',
        destination: 'nano_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji'
    };

    const onComplete = () => {
        // pass
    };

    const { brainblocks, brainblocksScript } = useBrainBlocksScript();

    useEffect(() => {
        if (brainblocks) {
            brainblocks.Checkout({
                env,
                transaction,
                onComplete
            }).renderTo(window.top, 'body');
        }
    });

    return (
        <div>
            <Head>
                <title>BrainBlocks Payments Demo</title>
            </Head>

            { brainblocksScript }
        </div>
    );
};

export default Index;
