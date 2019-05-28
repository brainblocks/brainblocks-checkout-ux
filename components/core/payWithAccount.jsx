/* @flow */

import React, { useState, type Element } from 'react';

import { CRYPTO_CURRENCY } from '../../constants';
import { getWallet } from '../../lib';
import { SelectDropdown } from '../ui/selectDropdown';
import { SubmitButton } from '../ui/submitButton';

import { SectionHeader } from './sectionHeader';
import { LoginForm } from './loginForm';

type PayWithAccountProps = {|
    cryptoAmount : string,
    cryptoCurrencyCode : $Values<typeof CRYPTO_CURRENCY>,
    cryptoDestination : string
|};

export function PayWithAccount({ cryptoAmount, cryptoCurrencyCode, cryptoDestination } : PayWithAccountProps) : null | Element<*> {
    if (!cryptoDestination) {
        return null;
    }

    const [ wallet, setWallet ] = useState();
    const [ selectedAccount, setSelectedAccount ] = useState();

    const handleLogin = ({ password, encryptedWallet }) => {
        return getWallet(cryptoCurrencyCode, encryptedWallet, password).then(result => {
            setWallet(result);
            setSelectedAccount(result.accounts[0].account);
        });
    };

    const handlePay = () => {
        if (!wallet) {
            throw new Error(`Can not pay without wallet`);
        }

        if (!selectedAccount) {
            throw new Error(`Can not pay without selected account`);
        }

        return wallet.send(selectedAccount, cryptoDestination, cryptoAmount);
    };

    return (
        <section>
            <style jsx>
                {`
                    .account-select {
                        margin-top: 10px;
                    }

                    .pay-button {
                        margin-top: 20px;
                    }
                `}
            </style>

            {
                (wallet && selectedAccount)

                    ? (
                        <>
                            <SectionHeader
                                subheader='Pay Faster'
                                header='Select a Wallet'
                            />

                            <section className='account-select'>
                                <SelectDropdown
                                    value={ selectedAccount }
                                    options={ wallet.accounts.map(
                                        ({ label, account }) => ({ label, value: account })
                                    ) }
                                    onChange={ setSelectedAccount }
                                />
                            </section>

                            <section className="pay-button">
                                <SubmitButton
                                    onSubmit={ handlePay }
                                    text="Confirm and Pay"
                                />
                            </section>
                        </>
                    )

                    : (
                        <>
                            <SectionHeader
                                subheader='Pay Faster'
                                header='Log into BrainBlocks'
                            />

                            <LoginForm
                                onLogin={ handleLogin }
                            />
                        </>
                    )
            }
        </section>
    );
}
