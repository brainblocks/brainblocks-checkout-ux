/* @flow */

import { useState, useEffect } from 'react';

import { setupSession, awaitFunds } from '../api/transfer';
import { CRYPTO_CURRENCY, FIAT_CURRENCY } from '../config/constants';
import { hasConstant } from '../lib';

const DEFAULT_CRYPTO_CURRENCY = CRYPTO_CURRENCY.NANO;

export function usePaymentSession({ time = 10 * 60 * 1000 } = {}) {
    if (!window.xprops) {
        throw new Error(`Brainblocks zoid component not loaded in child`);
    }
    
    const { amount, currency, destination, payeeName, payeeLogo } = window.xprops.transaction;

    const cryptoDestination = destination;

    let cryptoCurrencyCode;
    let defaultCryptoAmount;

    let fiatCurrencyCode;
    let fiatAmount;

    if (hasConstant(CRYPTO_CURRENCY, currency)) {
        cryptoCurrencyCode = currency;
        defaultCryptoAmount = amount;
    } else if (hasConstant(FIAT_CURRENCY, currency)) {
        cryptoCurrencyCode = DEFAULT_CRYPTO_CURRENCY;
        fiatCurrencyCode = currency;
        fiatAmount = amount;
    }

    const [ token, setToken ] = useState(false);
    const [ cryptoAmount, setCryptoAmount ] = useState(defaultCryptoAmount);
    const [ cryptoAccount, setCryptoAccount ] = useState();
    const [ received, setReceived ] = useState(false);
    const [ failed, setFailed ] = useState(false);

    useEffect(() => {
        let sessionAmount = amount;
        if (currency === CRYPTO_CURRENCY.NANO) {
            sessionAmount = parseInt(parseFloat(amount) * 1000000);
        }

        setupSession({ amount: sessionAmount, currency, destination }).then(({ token, account, amount_rai }) => {
            setToken(token);
            setCryptoAccount(account);
            setCryptoAmount((amount_rai / 1000000).toFixed(3));

            return awaitFunds({ token, time }).then(() => {
                setReceived(true);
            }).catch(err => {
                setFailed(true);
            });
        });
    }, [ amount, currency, destination ]);

    return { token, received, cryptoAccount, cryptoDestination, fiatCurrencyCode, fiatAmount, cryptoCurrencyCode, cryptoAmount, payeeName, payeeLogo };
}
