/* @flow */

import React, { useState, type Element } from 'react';

import { BRAINBLOCKS_SCRIPT } from '../config';
import { Script } from '../components';
import { isBrowser } from '../lib';
import type { BrainBlocksType } from '../types';

export function useScript<T>(url : string, namespace : string) : { module : ?T, script : null | Element<*> } {

    const getModule = () => {
        return isBrowser() ? window[namespace] : null;
    };

    const [ module, setModule ] = useState(getModule());
    
    // $FlowFixMe
    const script = (isBrowser() && window[namespace])
        ? null
        : <Script src={ url } onLoad={ () => setModule(getModule()) } />;

    return { module, script };
}

export function useBrainBlocksScript() : { brainblocks : ?BrainBlocksType, brainblocksScript : null | Element<*> } {
    const { module: brainblocks, script: brainblocksScript } = useScript(BRAINBLOCKS_SCRIPT, 'brainblocks');
    return { brainblocks, brainblocksScript };
}
