/* @flow */

export const PAYMENT_STATUS = {
    PENDING:  'pending',
    RECEIVED: 'received'
};

export const FIAT_CURRENCY = {
    USD: 'usd',
    GBP: 'gbp',
    EUR: 'eur'
};

export const FIAT_CURRENCY_SYMBOL = {
    [ FIAT_CURRENCY.USD ]: '$',
    [ FIAT_CURRENCY.GBP ]: '£',
    [ FIAT_CURRENCY.EUR ]: '€'
};

export const CRYPTO_CURRENCY = {
    NANO: 'nano'
};
