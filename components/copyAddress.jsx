/* @flow */

import React, { type Element } from 'react';

import { CopyField } from './copyField';

type CopyAddressProps = {|
    cryptoAmount : string,
    cryptoCurrencyCode : string,
    cryptoDestination : string
|};

export function CopyAddress({ cryptoDestination, cryptoCurrencyCode, cryptoAmount } : CopyAddressProps) : Element<*> {

    return (
        <section>
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

                .fields {
                    text-align: left;
                    width: 60%;
                    display: inline-block;
                }
            `}
            </style>
            <p className="pay-faster">Copy Paste</p>
            <p className="login-text">Copy the Nano Address</p>

            <section className="fields">
                <CopyField
                    label={ `Required ${ cryptoCurrencyCode }` }
                    text={ cryptoAmount }
                />
                <CopyField
                    label={ `${ cryptoCurrencyCode } Address` }
                    text={ cryptoDestination }
                />
            </section>
        </section>
    );
}
