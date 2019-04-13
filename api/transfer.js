/* @flow */

import { delay } from '../lib/util';

import { SESSION_API_URL } from './config';
import { callAPI } from './api';

const STATUS = {
    SUCCESS: 'success'
};

export function setupSession({ destination, amount, currency }) : Promise<mixed> {
    amount = '1000';
    currency = 'rai';
    return callAPI('post', SESSION_API_URL, {
        destination, amount, currency
    }).then(({ amount_rai, account, token }) => {
        return { token, account, amount_rai };
    });
}

export function awaitFunds({ token, time, failures = 0 }) : Promise<mixed> {
    const start = Date.now();

    return callAPI('post', `${ SESSION_API_URL }/${ token }/transfer`, {
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
