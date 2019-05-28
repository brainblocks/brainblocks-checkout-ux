/* @flow */

import { delay } from '../lib/util';
import { CRYPTO_CURRENCY, FIAT_CURRENCY } from '../constants';

import { SESSION_API_URL } from './config';
import { callPaymentAPI, METHOD } from './api';

type Session = {|
    token : string,
    account : string,
    amount_rai : number
|};

export function setupSession({ destination, amount, currency } : { destination : string, amount : string, currency : $Values<typeof CRYPTO_CURRENCY | typeof FIAT_CURRENCY> }) : Promise<Session> {
    return callPaymentAPI(METHOD.POST, SESSION_API_URL, {
        destination, amount, currency
    }).then(({ amount_rai, account, token }) => {
        return { token, account, amount_rai };
    });
}

export function awaitFunds({ token, time, failures = 0 } : { token : string, time : number, failures? : number }) : Promise<void> {
    const start = Date.now();

    return callPaymentAPI(METHOD.POST, `${ SESSION_API_URL }/${ token }/transfer`, {
        time
    }).catch(err => {
        const elapsed = Date.now() - start;
        time -= elapsed;
        failures += 1;

        if (time < 5000 || failures >= 5) {
            throw err;
        }

        return delay(failures * 2000).then(() => {
            return awaitFunds({ token, time, failures });
        });
    });
}
