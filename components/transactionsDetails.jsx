/* @flow */

import React, { type Element } from 'react';

import { CRYPTO_CURRENCY, FIAT_CURRENCY, FIAT_CURRENCY_SYMBOL } from '../config/constants';
import NanoLogo from '../img/nano_logo.svg';

type TransactionDetailsProps = {|
    payeeName : string,
    payeeLogo : ?string,
    cryptoAmount : string,
    cryptoCurrencyCode : $Values<typeof CRYPTO_CURRENCY>,
    fiatAmount : ?string,
    fiatCurrencyCode : ?$Values<typeof FIAT_CURRENCY>
|};

const CRYPTO_LOGOS = {
    [ CRYPTO_CURRENCY.NANO ]: NanoLogo
};

export function TransactionDetails({ payeeName, payeeLogo, cryptoAmount, cryptoCurrencyCode, fiatAmount, fiatCurrencyCode } : TransactionDetailsProps) : Element<*> {
    const CryptoLogo = CRYPTO_LOGOS[cryptoCurrencyCode];

    return (
        <section>
            <style jsx>
                {`
                    .transaction-details {
                        border-radius: 10px;
                        box-shadow: 3px 3px 18px #eee;
                        background-color: white;
                        position: relative;
                        padding-top: ${ payeeLogo ? '30px' : '15px' };
                        padding-bottom: 15px;
                        text-align: center;
                    }

                    .transaction-details .payee {
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        color: #bbb;
                        font-weight: bold;
                    }

                    .transaction-details .payee-logo {
                        position: absolute;
                        top: -25px;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    .transaction-details .payee-logo img {
                        height: 50px;
                        max-width: 200px;
                        border-radius: 5px;
                    }

                    .transaction-details .payee .payee-name {
                        color: #7fb4f9;
                    }

                    .transaction-details .crypto-amount {
                        margin-top: 5px;
                    }

                    .transaction-details .crypto-amount .logo {
                        display: inline-block;
                        vertical-align: middle;
                        height: 10px;
                        margin-right: 10px;
                    }

                    .transaction-details .crypto-amount .logo svg {
                        height: 100%;
                        vertical-align: top;
                    }

                    .transaction-details .crypto-amount .amount {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 30px;
                    }

                    .transaction-details .fiat-amount {
                        margin-top: 5px;
                        font-size: 12px;
                        color: #888;
                    }
                `}
            </style>

            <div className='transaction-details'>
                <div className='payee-logo'>
                    { payeeLogo &&
                    <img src={ payeeLogo } />
                    }
                </div>

                <div className='payee'>
                    Pay <span className='payee-name'>{ payeeName }</span>
                </div>

                <div className='crypto-amount'>
                    <span className='logo'><CryptoLogo /></span>
                    <span className='amount'>{ cryptoAmount }</span>
                </div>

                { (fiatAmount && fiatCurrencyCode) && (
                    <div className='fiat-amount'>
                        <span className='symbol'>{ FIAT_CURRENCY_SYMBOL[fiatCurrencyCode] }</span><span className='amount'>{ fiatAmount }</span>
                    </div>
                ) }

            </div>
        </section>
    );
}
