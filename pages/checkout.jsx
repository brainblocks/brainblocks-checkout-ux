/* @flow */

import React from 'react';
import Head from 'next/head';

import { useBrainBlocksScript } from '../hooks';
import { StatusBanner } from '../components/statusBanner';
import { PAYMENT_STATUS } from '../config/constants';
import { PaymentTypeSelector } from '../components/paymentTypeSelector';

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
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Maven+Pro:700,900|Montserrat:400,600|Source+Code+Pro:600" rel="stylesheet" />
                <script>
                    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
                </script>
            </Head>

            <style jsx global>
                {`
                    * {
                        font-family: Montserrat,sans-serif;
                    }
                    
                    html, body {
                        margin: 0;
                        padding: 0;
                    }
                `}
            </style>

            { brainblocksScript }

            <StatusBanner status={ PAYMENT_STATUS.PENDING } />

            <style jsx>
                {`
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
                        margin-top: 200px;
                        height: 40px;
                    }
                `}
            </style>

            <section>
                <PaymentTypeSelector />
                <button type='button' data-testid='pay-button' onClick={ onComplete }>Complete Checkout</button>
            </section>
        </div>
    );
};

export default Checkout;
