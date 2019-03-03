/* @flow */

import React from 'react';
import Head from 'next/head';

import { useBrainBlocksScript } from '../hooks';
import { StatusBanner } from '../components/statusBanner';
import { PAYMENT_STATUS } from '../config/constants';
import { PaymentTypeSelector } from '../components/paymentTypeSelector';
import { AccountLoginForm } from '../components/accountLoginForm';

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
                        box-sizing: border-box;
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                        text-align: center;
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
                `}
            </style>

            <section>
                <PaymentTypeSelector />
                <AccountLoginForm />
            </section>
        </div>
    );
};

export default Checkout;
