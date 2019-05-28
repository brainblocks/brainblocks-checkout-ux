/* @flow */

import { Wallet, Block  } from 'rai-wallet';
import BigInt from 'big-integer';

import { CRYPTO_CURRENCY } from '../constants';
import { getChains, broadcastBlock, type Accounts } from '../api/wallet';

import { promiseTry } from './util';

export function rawToNano(raw : string) : string {
    return (BigInt(raw)
        .over('1000000000000000000000000')
        .toJSNumber() / 1000000).toString();
}

export function nanoToRaw(nano : string) : string {
    return BigInt(parseInt(parseFloat(nano) * 1000000, 10))
        .multiply('1000000000000000000000000')
        .toString();
}

function importBlocks(wallet : Wallet, accounts : Accounts) {
    for (const acc of Object.keys(accounts)) {
        const blocks = accounts[acc].blocks;
        blocks.reverse();
        for (const block of blocks) {
            const contents = JSON.parse(block.contents);
            const blk = new Block(contents.type === 'state');
            blk.buildFromJSON(block.contents);
            if (block.origin) {
                blk.setOrigin(block.origin);
            }
            blk.setAccount(acc);
            blk.setAmount(block.amount);
            blk.setImmutable(true);
            wallet.importBlock(blk, acc, false);
        }
        wallet.useAccount(acc);
        wallet.setAccountBalancePublic(accounts[acc].balance, acc);
    }
}

export type WalletType = {|
    accounts : $ReadOnlyArray<{|
        account : string,
        label : string,
        balance : string
    |}>,
    send : (string, string, string) => Promise<void>
|};

export function getWallet(cryptoCyrrency : $Values<typeof CRYPTO_CURRENCY>, encryptedWallet : string, password : string) : Promise<WalletType> {
    return promiseTry(() => {
        if (cryptoCyrrency !== CRYPTO_CURRENCY.NANO) {
            throw new Error(`Unsupported currency for client wallet: ${ cryptoCyrrency }`);
        }
        
        const wallet = new Wallet(password);
        wallet.lightWallet(true);
        wallet.load(encryptedWallet);
        let accounts = wallet.getAccounts().map(({ account, label }) => ({ account, label }));

        return getChains({ accounts: accounts.map(acc => acc.account) }).then(chains => {
            importBlocks(wallet, chains.accounts);
            
            accounts = accounts.map(({ account, label }) => {
                const { balance } = chains.accounts[account];

                return {
                    account,
                    label,
                    balance
                };
            });

            const send = (from, to, amount) => {
                const block = wallet.addPendingSendBlock(from, to, nanoToRaw(amount));
                return broadcastBlock({ block });
            };

            return { accounts, send };
        });
    });
}
