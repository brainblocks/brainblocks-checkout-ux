/* @flow */

import React, { type Element } from 'react';

import { CRYPTO_CURRENCY, FIAT_CURRENCY_SYMBOL, FIAT_CURRENCY } from '../../constants';
import ConfirmationIllustration from '../../img/confirmation_illustration.svg';

type SuccessMessageProps = {|
    payeeName : string,
    cryptoAmount : string,
    cryptoCurrencyCode : $Values<typeof CRYPTO_CURRENCY>,
    fiatAmount : ?string,
    fiatCurrencyCode : ?$Values<typeof FIAT_CURRENCY>
|};

export function SuccessMessage({ payeeName, cryptoAmount, cryptoCurrencyCode, fiatAmount, fiatCurrencyCode } : SuccessMessageProps) : Element<*> {
    return (
        <section className="success-message">
            <style jsx>
                {`
                    section.success-message {
                        padding: 40px;
                    }

                    h2.subheader {
                        text-transform: uppercase;
                        font-size: 10px;
                        color: #C4C4C4;
                        font-weight: bold;
                        letter-spacing: 1px;
                        margin-bottom: 5px;
                        margin-top: 20px;
                    }

                    h1.header {
                        font-weight: bold;
                        color: #777;
                        margin: 0;
                        font-size: 35px;
                    }

                    section.transaction-details {
                        background: white;
                        border-radius: 10px;
                        margin-top: 20px;
                        padding: 30px;
                        font-size: 16px;
                    }

                    p {
                        padding: 0;
                        margin: 10px 0;
                    }

                    section.transaction-details .payee {
                        color: #999;
                    }

                    section.transaction-details .payee .payee-name {
                        color: #7fb4f9;
                        font-weight: bold;
                    }

                    section.transaction-details .amount {
                        color: #888;
                        margin-top: 12px;
                        font-weight: bold;
                    }
                `}
            </style>

            <ConfirmationIllustration />

            <h2 className="subheader">Transaction Successful</h2>
            <h1 className="header">Completed</h1>

            <section className="transaction-details">
                <section className="payee"><span className="payee-name">{ payeeName }</span> has received</section>
                <section className="amount">
                    { cryptoAmount } { cryptoCurrencyCode.toUpperCase() }
                    {
                        (fiatAmount && fiatCurrencyCode) &&
                            ` (${ FIAT_CURRENCY_SYMBOL[fiatCurrencyCode] }${ fiatAmount })`
                    }
                    
                </section>
            </section>
        </section>
    );
}
