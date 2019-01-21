/* @flow */

import React from 'react';

import { useBrainBlocksScript } from '../hooks';

const Button = () => {
    const { brainblocks, brainblocksScript } = useBrainBlocksScript();

    const onClick = () => {
        if (!brainblocks) {
            throw new Error(`BrainBlocks script not loaded`);
        }

        return brainblocks.Checkout({
            env:         window.xprops.env,
            transaction: window.xprops.transaction,
            onComplete:  window.xprops.onComplete
        }).renderTo(window.top, 'body');
    };

    return (
        <div>
            { brainblocksScript }

            <style jsx global>{`
                html, body { 
                    margin: 0;
                    padding: 0;
                }
            `}
            </style>

            <style jsx>{`
                button {
                    background: #eee;
                    border: none;
                    border-radius: 5px;
                    display: inline-block;
                    width: 100%;
                    font-size: 20px;
                    cursor: pointer;
                    font-family: helvetica, sans-serif;
                }

                @media only screen and (min-width: 100px) {
                    button {
                        height: 30px;
                        font-size: 15px;
                        line-height: 15px;
                    }
                }

                @media only screen and (min-width: 150px) {
                    button {
                        height: 40px;
                        font-size: 18px;
                        line-height: 18px;
                    }
                }

                @media only screen and (min-width: 250px) {
                    button {
                        height: 50px;
                        font-size: 21px;
                        line-height: 21px;
                    }
                }

                @media only screen and (min-width: 400px) {
                    button {
                        height: 55px;
                        font-size: 24px;
                        line-height: 24px;
                    }
                }

            `}
            </style>

            <button data-testid="checkout-button" onClick={ onClick } type='button'>
                Pay with BrainBlocks
            </button>
        </div>
    );
};

export default Button;
