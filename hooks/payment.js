/* @flow */

import { useState, useEffect } from 'react';

import { setupSession, awaitFunds } from '../api/transfer';
import { CRYPTO_CURRENCY, FIAT_CURRENCY } from '../config/constants';
import { hasConstant } from '../lib';

const DEFAULT_CRYPTO_CURRENCY = CRYPTO_CURRENCY.NANO;
const DEFAULT_TIME = 10 * 60 * 1000;

type PaymentSession = {|
    token : string,
    received : boolean,
    failed : boolean,
    cryptoAccount : string,
    cryptoDestination : string,
    fiatCurrencyCode : ?$Values<typeof FIAT_CURRENCY>,
    fiatAmount : ?string,
    cryptoCurrencyCode : $Values<typeof CRYPTO_CURRENCY>,
    cryptoAmount : string,
    payeeName : string,
    payeeLogo : string
|};

export function usePaymentSession({ time = DEFAULT_TIME } : { time? : number } = {}) : ?PaymentSession {
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
    } else {
        throw new Error(`Unexpected currency: ${ currency }`);
    }

    const [ token, setToken ] = useState(false);
    const [ cryptoAmount, setCryptoAmount ] = useState(defaultCryptoAmount);
    const [ cryptoAccount, setCryptoAccount ] = useState();
    const [ received, setReceived ] = useState(false);
    const [ failed, setFailed ] = useState(false);

    useEffect(() => {
        let sessionAmount = amount;
        if (currency === CRYPTO_CURRENCY.NANO) {
            sessionAmount = parseInt(parseFloat(amount) * 1000000, 10).toString();
        }

        setupSession({ amount: sessionAmount, currency, destination }).then(({ token: sessionToken, account, amount_rai }) => {
            setToken(sessionToken);
            setCryptoAccount(account);
            setCryptoAmount((amount_rai / 1000000).toFixed(3));

            return awaitFunds({ token: sessionToken, time }).then(() => {
                setReceived(true);
            });
        }).catch(() => {
            setFailed(true);
        });
    }, [ amount, currency, destination ]);

    if (!token || !cryptoAccount || !cryptoAmount) {
        return;
    }

    return { token, received, failed, cryptoAccount, cryptoDestination, fiatCurrencyCode, fiatAmount, cryptoCurrencyCode, cryptoAmount, payeeName, payeeLogo };
}
