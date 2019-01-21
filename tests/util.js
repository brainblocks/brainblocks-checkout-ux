/* @flow */

import { ZalgoPromise } from 'zalgo-promise';

import { BRAINBLOCKS_SCRIPT } from '../config';

export function setupMocks({ brainblocks = {}, xprops = {} } : { brainblocks? : Object, xprops? : Object } = {}) {
    // $FlowFixMe
    process.browser = true;

    global.__mock_scripts__ = global.__mock_scripts__ || {};
    global.__mock_scripts__[BRAINBLOCKS_SCRIPT] = ({ onLoad }) => {
        window.brainblocks = {
            ...brainblocks
        };
        window.xprops = {
            close: () => ZalgoPromise.resolve(),
            ...xprops
        };
        onLoad();
    };
}
