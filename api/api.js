/* @flow */

import { objToQuery } from '../lib/util';

export function callAPI(method, url, data) {
    data = data || {};

    const req = {
        method,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        timeout: 100000
    };

    if (method === 'post') {
        req.body = objToQuery(data);
    }

    return fetch(url, req)
        .then((res) => {
            return res.json().then((data) => {
                if (data.status !== 'success' && data.status !== 'expired') {
                    const err = new Error(`Api ${  url  } status: ${  data.status }`);
                    err.res = res;
                    throw err;
                }
                return data;
            });
        });
}
