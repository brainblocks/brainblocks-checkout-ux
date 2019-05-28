/* @flow */

import { AUTH_API_URL } from './config';
import { callWalletAPI, METHOD } from './api';

type LoginOptions = {|
    username : string,
    password : string,
    recaptcha : string,
    token2fa? : string
|};

export class AuthError extends Error {
    constructor(message : string) {
        super(message);
        this.name = 'AuthError';
    }
}

export class TwoFactorAuthError extends Error {
    constructor(message : string) {
        super(message);
        this.name = 'TwoFactorAuthError';
    }
}

const AUTH_ERROR = {
    TWO_FACTOR_AUTH: '2FA_REQUIRED'
};

export function login({ username, password, recaptcha, token2fa = '' } : LoginOptions) : Promise<void> {
    return callWalletAPI(METHOD.POST, AUTH_API_URL, {
        username, password, recaptcha, token2fa
    }).then(({ status, data }) => {

        if (status === 400 || status === 403) {
            throw new AuthError(data.error);
        }

        if (status === 401 && data.reason === AUTH_ERROR.TWO_FACTOR_AUTH) {
            throw new TwoFactorAuthError(data.error);
        }

        if (status === 200) {
            return data;
        }

        throw new Error(`Login failed: response status ${ status }`);
    });
}
