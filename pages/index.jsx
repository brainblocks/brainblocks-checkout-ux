/* @flow */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';

import { useBrainBlocksScript } from '../hooks';

const Index = () => {

    const env = 'local';
    
    const transaction = {
        currency:    'nano',
        amount:      '1000',
        destination: 'nano_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji'
    };

    const [ brainblocksToken, setBrainBlocksToken ] = useState();

    const onComplete = ({ token }) => {
        setBrainBlocksToken(token);
    };

    const { brainblocks, brainblocksScript } = useBrainBlocksScript();

    const BrainBlocksButton = brainblocks &&
        brainblocks.Button.driver('react', { React, ReactDOM });

    return (
        <div>
            <Head>
                <title>BrainBlocks Payments Demo</title>
            </Head>

            { brainblocksScript }

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
