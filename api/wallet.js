/* @flow */

import { CHAINS_API_URL, BROADCAST_API_URL } from './config';
import { callWalletAPI, METHOD } from './api';

type GetChainsOptions = {|
    accounts : $ReadOnlyArray<string>
|};

export function getChains({ accounts } : GetChainsOptions) : Promise<void> {
    return callWalletAPI(METHOD.POST, CHAINS_API_URL, { accounts }).then(({ status, data }) => {
        if (status === 200) {
            return data;
        }

        throw new Error(`Login failed: response status ${ status }`);
    });
}

type BroadcastBlockOptions  = {|
    block : string
|};

export function broadcastBlock({ block } : BroadcastBlockOptions) : Promise<void> {
    const json = block.getJSONBlock();
    const prev = block.getPrevious();

    return callWalletAPI(METHOD.POST, BROADCAST_API_URL, { block: json, hash: prev, amount: 'false' }).then(({ status }) => {
        if (status !== 200) {
            throw new Error(`Login failed: response status ${ status }`);
        }
    });
}
