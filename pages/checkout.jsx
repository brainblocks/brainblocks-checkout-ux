/* @flow */

import React from 'react';
import Head from 'next/head';

import { useBrainBlocksScript } from '../hooks';
import { StatusBanner } from '../components/statusBanner';
import { PAYMENT_STATUS } from '../config/constants';
import { PaymentTypeSelector } from '../components/paymentTypeSelector';
import { AccountLoginForm } from '../components/accountLoginForm';
import { TransactionDetails } from '../components/transactionsDetails';

const Checkout = () => {
    const { brainblocksScript } = useBrainBlocksScript();

    /*

    const onComplete = () => {
        window.xprops.onComplete({
            token: 'xyz123'
        });
        window.xprops.close();
    };

    */

    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Maven+Pro:700,900|Montserrat:400,600|Source+Code+Pro:600" rel="stylesheet" />
                <script>
                    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
                </script>
            </Head>

            { brainblocksScript }

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

                    .top-section {
                        width: 100%;
                        background-color: #f7f7f7;
                        padding: 40px;
                        padding-bottom: 70px;
                    }

                    .middle-section {
                        position: relative;
                        top: -28px;
                        text-align: center;
                        margin-bottom: -10px;
                        backround-color: #ddd;
                    }

                    .bottom-section {
                        backround-color: #ddd;
                    }
                `}
            </style>

            <StatusBanner
                status={ PAYMENT_STATUS.PENDING }
            />

            <section className='top-section'>
                <TransactionDetails
                    payeeName={ 'Apple Store' }
                    payeeLogo={ 'https://i.imgur.com/JkArT9C.png' }
                    cryptoAmount={ '20.543' }
                    cryptoCurrencyCode={ 'nano' }
                    fiatAmount={ '24.90' }
                    fiatCurrencyCode={ 'usd' }
                />
            </section>

            <section className='middle-section'>
                <PaymentTypeSelector />
            </section>

            <section className='bottom-section'>
                <AccountLoginForm />
            </section>

            <style jsx>
                {`
                    section {
                        text-align: center;
                    }
                `}
            </style>
        </div>
    );
};

export default Checkout;
