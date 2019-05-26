/* @flow */

import React, { type Element, type ChildrenArray } from 'react';
import NextHead from 'next/head';

import { BRAINBLOCKS_SCRIPT } from '../config';

export function Head({ children } : { children? : ChildrenArray<*> }) : Element<*> {
    return (
        <NextHead>
            <link href="https://fonts.googleapis.com/css?family=Maven+Pro:700,900|Montserrat:400,600|Source+Code+Pro:600" rel="stylesheet" />
            <script>
                window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
            </script>
            <script src={ BRAINBLOCKS_SCRIPT } />
            { children || null }
        </NextHead>
    );
}
