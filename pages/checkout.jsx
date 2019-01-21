/* @flow */

import React from 'react';

import { useBrainBlocksScript } from '../hooks';

const Checkout = () => {
    const { brainblocksScript } = useBrainBlocksScript();

    const onComplete = () => {
        window.xprops.onComplete({
            token: 'xyz123'
        });
        window.xprops.close();
    };

    return (
        <div>
            { brainblocksScript }

            <style jsx>{`
                section {
                    text-align: center;
                }

                button {
                    background: #eee;
                    border: none;
                    border-radius: 5px;
                    display: inline-block;
                    width: 250px;
                    font-size: 20px;
                    cursor: pointer;
                    font-family: helvetica, sans-serif;
                    margin-top: 200px;
                    height: 40px;
                }
            `}
            </style>

            <section>
                <button type='button' data-testid='pay-button' onClick={ onComplete }>Complete Checkout</button>
            </section>
        </div>
    );
};

export default Checkout;
