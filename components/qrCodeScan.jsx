/* @flow */

import React, { type Element } from 'react';
import QRCode from 'qrcode.react';

import { CRYPTO_CURRENCY } from '../config/constants';

type QRCodeScanProps = {|
    cryptoAmount : string,
    cryptoCurrencyCode : $Values<typeof CRYPTO_CURRENCY>,
    cryptoDestination : string
|};

export function QRCodeScan({ cryptoAmount, cryptoCurrencyCode, cryptoDestination } : QRCodeScanProps) : null | Element<*> {
    if (!cryptoDestination) {
        return null;
    }

    return (
        <div>
            <style jsx>{`
                .pay-faster {
                    text-transform: uppercase;
                    font-size: 10px;
                    color: #C4C4C4;
                    font-weight: bold;
                    letter-spacing: 1px;
                    margin-bottom: 5px;
                }

                .login-text {
                    font-weight: bold;
                    color: #939393;
                    margin: 0;
                }

                .qr-code {
                    margin: 0;
                    padding: 0;
                    margin-top: 30px;
                }
            `}
            </style>
            <p className="pay-faster">Scan and Pay</p>
            <p className="login-text">Send { cryptoAmount } { cryptoCurrencyCode }</p>
            <p className="qr-code"><QRCode value={ cryptoDestination } size={ 180 } /></p>
        </div>
    );
}
