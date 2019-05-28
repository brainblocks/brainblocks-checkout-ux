/* @flow */

import React, { useState, useEffect } from 'react';

import { usePaymentSession } from '../hooks';
import { StatusBanner } from '../components/core/statusBanner';
import { PAYMENT_STATUS } from '../constants';
import { PayTypeSelector } from '../components/core/payTypeSelector';
import { TransactionDetails } from '../components/core/transactionsDetails';
import { PayWithQRCode } from '../components/core/payWithQRCode';
import { PayWithCopyPaste } from '../components/core/payWithCopyPaste';
import { Head } from '../components/dom/head';
import { getLocalStorage, setLocalStorage, isBrowser } from '../lib/util';
import { SuccessMessage } from '../components/core/successMessage';
import { PayWithAccount } from '../components/core/payWithAccount';
import { LOCAL_STORAGE_KEY } from '../constants/storage';

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
        return getLocalStorage(LOCAL_STORAGE_KEY.SELECTED_PAGE) || defaultPage;
    });

    const setSelectedPage = (selectedPage) => {
        setLocalStorage(LOCAL_STORAGE_KEY.SELECTED_PAGE, selectedPage);
        setPage(selectedPage);
    };

    return [ page, setSelectedPage ];
};


const Checkout = () => {
    if (!isBrowser()) {
        return <Head />;
    }

    const paymentSession = usePaymentSession();
    const { payeeName, payeeLogo, cryptoAmount, cryptoCurrencyCode, fiatAmount, fiatCurrencyCode, cryptoAccount, received } = paymentSession || {};

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

    if (!paymentSession) {
        return <Head />;
    }

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

                    .page-section {
                        width: 300px;
                        margin: auto;
                    }
                `}
            </style>

            <StatusBanner
                status={ received ? PAYMENT_STATUS.RECEIVED : PAYMENT_STATUS.PENDING }
            />

            {
                received
                    ? (
                        <SuccessMessage
                            payeeName={ payeeName }
                            cryptoAmount={ cryptoAmount }
                            cryptoCurrencyCode={ cryptoCurrencyCode }
                            fiatAmount={ fiatAmount }
                            fiatCurrencyCode={ fiatCurrencyCode }
                        />
                    )

                    : (
                        <>
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
                                <PayTypeSelector pages={ PAGES } selected={ selectedPage } onSelect={ setSelectedPage } />
                            </section>

                            <section className='bottom-section'>
                                <section className='page-section'>
                                    {
                                        (selectedPage === PAGE.WALLET) &&
                                            <PayWithAccount
                                                cryptoCurrencyCode={ cryptoCurrencyCode }
                                                cryptoAmount={ cryptoAmount }
                                                cryptoDestination={ cryptoAccount } />
                                    }
                                    {
                                        (selectedPage === PAGE.SCAN) &&
                                            <PayWithQRCode
                                                cryptoCurrencyCode={ cryptoCurrencyCode }
                                                cryptoAmount={ cryptoAmount }
                                                cryptoDestination={ cryptoAccount } />
                                    }
                                    {
                                        (selectedPage === PAGE.COPY) &&
                                            <PayWithCopyPaste
                                                cryptoCurrencyCode={ cryptoCurrencyCode }
                                                cryptoAmount={ cryptoAmount }
                                                cryptoDestination={ cryptoAccount } />
                                    }
                                </section>
                            </section>
                        </>
                    )
            }
        </div>
    );
};

export default Checkout;
