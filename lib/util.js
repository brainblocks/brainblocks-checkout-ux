/* @flow */

export function isBrowser() : boolean {
    // $FlowFixMe
    return Boolean(process.browser);
}