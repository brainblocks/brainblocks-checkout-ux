/* @flow */

import { objToQuery } from '../lib/util';

export const METHOD = {
    GET:  'get',
    POST: 'post'
};

const STATUS = {
    SUCCESS: 'success',
    EXPIRED: 'expired',
    ERROR:   'error'
};

export function callPaymentAPI<T>(method : string, url : string, data : ?Object) : Promise<T> {
    data = data || {};

    const req : RequestOptions = { // eslint-disable-line no-undef
        method,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        timeout: 100000
    };

    if (method === 'post') {
        req.body = objToQuery(data);
    }

    return fetch(url, req)
        .then((res) => {
            return res.json().then(json => {
                if (json.status !== STATUS.SUCCESS && json.status !== STATUS.EXPIRED) {
                    const err = new Error(`Api ${  url  } status: ${  json.status }`);
                    // $FlowFixMe
                    err.res = res;
                    throw err;
                }
                return json;
            });
        });
}

type WalletResponse<T> = {|
    status : number,
    headers : { [string] : string },
    data : T
|};

export function callWalletAPI<T>(method : string, url : string, data : ?Object) : Promise<WalletResponse<T>> {
    return fetch(url, {
        method,
        headers: data ? { 'content-type': 'application/json' } : {},
        body:    data ? JSON.stringify(data) : null
    }).then(res => {
        return res.json().then(json => {
            return {
                status:  res.status,
                headers: res.headers,
                data:    json
            };
        });
    });
}
