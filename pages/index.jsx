/* @flow */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Head } from '../components/head';
import { isBrowser } from '../lib';

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

    const [ brainblocksToken, setBrainBlocksToken ] = useState();

    const onComplete = ({ token }) => {
        setBrainBlocksToken(token);
    };

    if (!isBrowser()) {
        return (
            <Head>
                <title>BrainBlocks Payments Demo</title>
            </Head>
        );
    }

    const BrainBlocksButton = window.brainblocks &&
        window.brainblocks.Button.driver('react', { React, ReactDOM });

    return (
        <div>
            <Head>
                <title>BrainBlocks Payments Demo</title>
            </Head>

            <style jsx global>{`
                html, body { 
                    font-family: helvetica, sans-serif;
                }
            `}
            </style>

            <style jsx>{`
                section {
                    margin-top: 80px;
                    text-align: center;
                }

                section p {
                    margin-top: 40px;
                    width: 30%;
                    display: inline-block;
                }
            `}
            </style>

            <section>
                <h2>BrainBlocks Payments Demo</h2>
                <p>
                    { BrainBlocksButton &&
                        <BrainBlocksButton
                            env={ env }
                            transaction={ transaction }
                            onComplete={ onComplete } />
                    }
                </p>

                <br />

                {
                    brainblocksToken &&
                        <p>Payment complete: <b>{ brainblocksToken }</b></p>
                }
            </section>
        </div>
    );
};

export default Index;
