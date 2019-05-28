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
    cryptoDestination : string,
    onPayment : () => (void | Promise<void>)
|};

export function PayWithAccount({ cryptoAmount, cryptoCurrencyCode, cryptoDestination, onPayment } : PayWithAccountProps) : null | Element<*> {
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

        return wallet.send(selectedAccount, cryptoDestination, cryptoAmount).then(() => {
            return onPayment();
        });
    };

    const getValidAccounts = () => {
        if (!wallet) {
            throw new Error(`Can not get accounts when wallet not populated`);
        }

        return wallet.accounts.filter(account => {
            return (parseFloat(account.balance) >= parseFloat(cryptoAmount));
        });
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

                            {
                                getValidAccounts().length

                                    ? (
                                        <>
                                            <section className='account-select'>
                                                <SelectDropdown
                                                    value={ selectedAccount }
                                                    options={ getValidAccounts().map(
                                                        ({ label, account, balance }) => ({
                                                            label: `${ label } (${ balance } ${ cryptoCurrencyCode.toUpperCase() })`,
                                                            value: account
                                                        })
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
                                        <p>No accounts with sufficient balance</p>
                                    )
                            }
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
