/* @flow */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Head } from '../components/dom/head';
import { isBrowser } from '../lib';

const transaction = {};

transaction.payeeName = 'Apple Store';
transaction.payeeLogo = 'https://i.imgur.com/JkArT9C.png';

transaction.currency = 'usd';
transaction.amount = '0.01';

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

                #button-container {
                    margin-top: 40px;
                    width: 40%;
                    display: inline-block;
                }
            `}
            </style>

            <section>
                <h2>BrainBlocks Payments Demo</h2>
                <div id='button-container'>
                    { BrainBlocksButton &&
                        <BrainBlocksButton
                            env={ env }
                            transaction={ transaction }
                            onComplete={ onComplete } />
                    }
                </div>

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
