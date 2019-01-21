/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import type { ZalgoPromise } from 'zalgo-promise';

export type TransactionType = {|
    destination : string,
    currency : string,
    amount : string
|};

export type OnComplete = ({|
    token : string
|}) => void;

export type OnClick = () => void;
export type OnToken = () => void;

export type BrainBlocksProps = {|
    env : string,
    transaction : TransactionType,
    onComplete : OnComplete,
    onClick? : ?OnClick,
    onToken? : ?OnToken
|};

export type BrainBlocksType = {|
    Button : {|
        driver : ('react', { React : typeof React, ReactDOM : typeof ReactDOM }) => Class<React.Component<BrainBlocksProps>> // eslint-disable-line no-undef
    |},
    Checkout : {|
        (BrainBlocksProps) : {|
            renderTo : ZalgoPromise<void>
        |}
    |}
|};
