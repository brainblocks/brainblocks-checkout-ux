/* @flow */

import React from 'react';
import QRCode from 'qrcode.react';

export const QRCodeScan = ({ cryptoAmount, cryptoCurrencyCode, cryptoDestination }) => {

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
            `}
            </style>
            <p className="pay-faster">Scan and Pay</p>
            <p className="login-text">Send { cryptoAmount } { cryptoCurrencyCode }</p>
            <p><QRCode value={ cryptoDestination } size={ 180 } /></p>
        </div>
    );
};
