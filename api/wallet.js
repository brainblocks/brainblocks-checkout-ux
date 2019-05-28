/* @flow */

import { CHAINS_API_URL, BROADCAST_API_URL } from './config';
import { callWalletAPI, METHOD } from './api';

type GetChainsOptions = {|
    accounts : $ReadOnlyArray<string>
|};

export type Accounts = {
    [string] : {|
        balance : string,
        // eslint-disable-next-line flowtype/no-mutable-array
        blocks : Array<{|
            origin : string,
            contents : string,
            amount : string
        |}>
    |}
};

export type Chains = {|
    accounts : Accounts
|};

export function getChains({ accounts } : GetChainsOptions) : Promise<Chains> {
    return callWalletAPI(METHOD.POST, CHAINS_API_URL, { accounts }).then(({ status, data }) => {
        if (status === 200) {
            return data;
        }

        throw new Error(`Login failed: response status ${ status }`);
    });
}

type BroadcastBlockOptions  = {|
    block : Object
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
