/* @flow */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { useBrainBlocksScript } from '../hooks';
import { StatusBanner } from '../components/statusBanner';
import { PAYMENT_STATUS } from '../config/constants';
import { PaymentTypeSelector } from '../components/paymentTypeSelector';
import { AccountLoginForm } from '../components/accountLoginForm';
import { TransactionDetails } from '../components/transactionsDetails';
import { QRCodeScan } from '../components/qrCodeScan';

const PAGE = {
    WALLET: 'wallet',
    SCAN:   'scan',
    COPY:   'copy'
};

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

    const pages = [
        {
            name:  PAGE.WALLET,
            label: 'Wallet'
        },
        {
            name:  PAGE.SCAN,
            label: 'Scan'
        },
        {
            name:  PAGE.COPY,
            label: 'Copy'
        }
    ];

    const [ selectedPage, setSelectedPage ] = useState(PAGE.WALLET);

    const [ payeeName, setPayeeName ] = useState();
    const [ payeeLogo, setPayeeLogo ] = useState();
    const [ cryptoAmount, setCryptoAmount ] = useState();
    const [ fiatAmount, setFiatAmount ] = useState();
    const [ fiatCurrencyCode, setFiatCurrencyCode ] = useState();
    const cryptoCurrencyCode = 'nano';
    const cryptoDestination = 'nano_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji';

    useEffect(() => {
        if (Math.random() < 0.5) {
            setPayeeName('Apple Store');
            setPayeeLogo('https://i.imgur.com/JkArT9C.png');
        } else {
            setPayeeName('Amazon');
            setPayeeLogo('https://i.imgur.com/AW14Qak.png');
        }

        setFiatAmount(`${ Math.floor(Math.random() * 100) }.${ Math.floor(Math.random() * 100) }`);
        setCryptoAmount(`${ Math.floor(Math.random() * 100) }.${ Math.floor(Math.random() * 1000) }`);
        setFiatCurrencyCode((Math.random() < 0.5) ? 'usd' : 'eur');
    }, []);

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
                        user-select: none;
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                `}
            </style>


            <style jsxs>
                {`
                    * {
                        font-family: Montserrat,sans-serif;
                        box-sizing: border-box;
                        user-select: none;
                    }

                    svg {
                        height: 100%;
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
                        padding-bottom: 20px;
                    }
                `}
            </style>

            <StatusBanner
                status={ PAYMENT_STATUS.PENDING }
            />

            <section className='top-section'>
                <TransactionDetails
                    payeeName={ payeeName }
                    payeeLogo={ payeeLogo }
                    cryptoAmount={ cryptoAmount }
                    cryptoCurrencyCode={ cryptoCurrencyCode }
                    fiatAmount={ fiatAmount }
                    fiatCurrencyCode={ fiatCurrencyCode }
                />
            </section>

            <section className='middle-section'>
                <PaymentTypeSelector pages={ pages } onSelect={ setSelectedPage } />
            </section>

            <section className='bottom-section'>
                {
                    (selectedPage === PAGE.WALLET) &&
                        <AccountLoginForm />
                }
                {
                    (selectedPage === PAGE.SCAN) &&
                        <QRCodeScan
                            cryptoCurrencyCode={ cryptoCurrencyCode }
                            cryptoAmount={ cryptoAmount }
                            cryptoDestination={ cryptoDestination } />
                }
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
