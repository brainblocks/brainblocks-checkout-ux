/* @flow */

import React, { useState, useEffect } from 'react';

import { usePaymentSession } from '../hooks';
import { StatusBanner } from '../components/statusBanner';
import { PAYMENT_STATUS } from '../config/constants';
import { PaymentTypeSelector } from '../components/paymentTypeSelector';
import { AccountLoginForm } from '../components/accountLoginForm';
import { TransactionDetails } from '../components/transactionsDetails';
import { QRCodeScan } from '../components/qrCodeScan';
import { CopyAddress } from '../components/copyAddress';
import { Head } from '../components/head';
import { getLocalStorage, setLocalStorage, isBrowser } from '../lib/util';
import { SuccessMessage } from '../components/successMessage';

const PAGE = {
    WALLET: 'wallet',
    SCAN:   'scan',
    COPY:   'copy'
};

const PAGES = [
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


const usePage = (defaultPage) => {
    const [ page, setPage ] = useState(() => {
        return getLocalStorage('brainblocks_payment_selected_page') || defaultPage;
    });

    const setSelectedPage = (page) => {
        setLocalStorage('brainblocks_payment_selected_page', page);
        setPage(page);
    };

    return [ page, setSelectedPage ];
};


const Checkout = () => {
    if (!isBrowser()) {
        return <Head />;
    }

    const { payeeName, payeeLogo, cryptoAmount, cryptoCurrencyCode, fiatAmount, fiatCurrencyCode, cryptoAccount, received } = usePaymentSession();
    const [ selectedPage, setSelectedPage ] = usePage(PAGE.WALLET);

    useEffect(() => {
        if (received) {
            const timeout = setTimeout(() => {
                window.xprops.onComplete({
                    
                });
            }, 3000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [ received ]);

    return (
        <div>
            <Head />

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
                        background-color: #f7f7f7;
                    }
                `}
            </style>

            <style jsx>
                {`
                    svg {
                        height: 100%;
                    }
                    
                    section {
                        text-align: center;
                    }

                    .top-section {
                        width: 100%;
                        background-color: #eee;
                        padding: 40px;
                        padding-bottom: 70px;
                    }

                    .middle-section {
                        position: relative;
                        top: -28px;
                        text-align: center;
                        margin-bottom: -10px;
                    }

                    .bottom-section {
                        background-color: #f7f7f7;
                        padding: 0 40px 30px;
                    }
                `}
            </style>

            <StatusBanner
                status={ received ? PAYMENT_STATUS.RECEIVED : PAYMENT_STATUS.PENDING }
            />

            {
                received
                    ? <SuccessMessage
                        payeeName={ payeeName }
                        cryptoAmount={ cryptoAmount }
                        cryptoCurrencyCode={ cryptoCurrencyCode }
                        fiatAmount={ fiatAmount }
                        fiatCurrencyCode={ fiatCurrencyCode }
                    />
                    : <>
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
                            <PaymentTypeSelector pages={ PAGES } selected={ selectedPage } onSelect={ setSelectedPage } />
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
                                    cryptoDestination={ cryptoAccount } />
                            }
                            {
                                (selectedPage === PAGE.COPY) &&
                                <CopyAddress
                                    cryptoCurrencyCode={ cryptoCurrencyCode }
                                    cryptoAmount={ cryptoAmount }
                                    cryptoDestination={ cryptoAccount } />
                            }
                        </section>
                    </>
            }
        </div>
    );
};

export default Checkout;
