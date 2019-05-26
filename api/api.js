/* @flow */

import { objToQuery } from '../lib/util';

const STATUS = {
    SUCCESS: 'success',
    EXPIRED: 'expired'
};

export function callAPI<T>(method : string, url : string, data : ?Object) : Promise<T> {
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
