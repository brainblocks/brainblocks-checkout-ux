/* @flow */

import React, { type Element } from 'react';

import { CopyField } from '../ui/copyField';

import { SectionHeader } from './sectionHeader';

type PayWithCopyPasteProps = {|
    cryptoAmount : string,
    cryptoCurrencyCode : string,
    cryptoDestination : string
|};

export function PayWithCopyPaste({ cryptoDestination, cryptoCurrencyCode, cryptoAmount } : PayWithCopyPasteProps) : Element<*> {

    return (
        <section>
            <style jsx>{`
                .fields {
                    text-align: left;
                }
                
                .field {
                    margin-top: 10px;
                }
            `}
            </style>

            <SectionHeader
                subheader='Copy and Paste'
                header='Copy the Nano Address'
            />

            <section className="fields">
                <section className='field'>
                    <CopyField
                        label={ `Required ${ cryptoCurrencyCode }` }
                        text={ cryptoAmount }
                    />
                </section>
                <section className='field'>
                    <CopyField
                        label={ `${ cryptoCurrencyCode } Address` }
                        text={ cryptoDestination }
                    />
                </section>
            </section>
        </section>
    );
}
