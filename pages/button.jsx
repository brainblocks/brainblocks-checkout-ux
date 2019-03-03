/* @flow */

import React from 'react';

import { useBrainBlocksScript } from '../hooks';
import BrainBlocksLogo from '../img/brainblocks_logo.svg';

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

                svg {
                    height: 100%;
                    display: inline-block;
                    vertical-align: middle;
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
                    min-height: 30px;
                    font-size: 20px;
                    cursor: pointer;
                    font-family: helvetica, sans-serif;
                    text-align: center;
                }

                button .logo {
                    height: 50vh;
                }

                button .logo .text {
                    display: none;
                    vertical-align: middle;
                    margin-top: 2px;
                    margin-right: 5px;
                    letter-spacing: 1px;
                }

                @media only screen and (min-width: 100px) {
                    button {
                        height: 30px;
                        font-size: 12px;
                        line-height: 15px;
                    }
                    
                    button .logo svg {
                        height: 100%;
                    }
                }

                @media only screen and (min-width: 150px) {
                    button {
                        height: 40px;
                        font-size: 13px;
                        line-height: 18px;
                    }
                    
                    button .logo svg {
                        height: 100%;
                    }
                }

                @media only screen and (min-width: 250px) {
                    button {
                        height: 50px;
                        font-size: 14px;
                        line-height: 21px;
                    }
                    
                    button .logo svg {
                        height: 100%;
                    }

                    button .logo .text {
                        display: inline-block;
                    }
                }

                @media only screen and (min-width: 400px) {
                    button {
                        height: 55px;
                        font-size: 15px;
                        line-height: 24px;
                    }
                }

            `}
            </style>

            <button data-testid="checkout-button" onClick={ onClick } type='button'>
                <div className="logo"><span className="text">Pay with</span><BrainBlocksLogo /></div>
            </button>
        </div>
    );
};

export default Button;
