/* @flow */

import React, { type Element } from 'react';
import QRCode from 'qrcode.react';

import { CRYPTO_CURRENCY } from '../../constants';
import { nanoToRaw } from '../../lib';

import { SectionHeader } from './sectionHeader';

type PayWithQRCodeProps = {|
    cryptoAmount : string,
    cryptoCurrencyCode : $Values<typeof CRYPTO_CURRENCY>,
    cryptoDestination : string
|};

export function PayWithQRCode({ cryptoAmount, cryptoCurrencyCode, cryptoDestination } : PayWithQRCodeProps) : null | Element<*> {
    if (!cryptoDestination) {
        return null;
    }

    const address = `nano:${ cryptoDestination }?amount=${ nanoToRaw(cryptoAmount) }`;

    return (
        <div>
            <style jsx>{`
                .qr-code {
                    margin: 0;
                    padding: 0;
                    margin-top: 30px;
                }
            `}
            </style>

            <SectionHeader
                subheader='Scan and Pay'
                header={ `Send ${ cryptoAmount } ${ cryptoCurrencyCode }` }
            />

            <section className="qr-code"><QRCode value={ address } size={ 180 } /></section>
        </div>
    );
}
