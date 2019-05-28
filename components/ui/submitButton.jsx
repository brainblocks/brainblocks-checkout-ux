/* @flow */

import React, { useState, type Element } from 'react';

import { promiseTry } from '../../lib';

import { Spinner } from './spinner';

type ButtonRef = {|
    submit : () => (void | Promise<void>)
|};

type SubmitButtonProps = {|
    onSubmit : () => void | Promise<void>,
    text : string,
    buttonRef? : {
        current : ?ButtonRef
    }
|};

export function SubmitButton({ onSubmit, text, buttonRef } : SubmitButtonProps) : Element<*> {
    const [ loading, setLoading ] = useState(false);

    const onClick = () => {
        if (loading) {
            return;
        }

        setLoading(true);
        return promiseTry(onSubmit)
            .finally(() => setLoading(false));
    };

    if (buttonRef) {
        buttonRef.current = {
            submit: () => onClick()
        };
    }

    return (
        <button type='button' onClick={ onClick }>
            <style jsx>
                {`
                    button {
                        position: relative;
                        width: 100%;
                        background-color: #5AB666;
                        padding: 10px 0;
                        color: white;
                        font-weight: bold;
                        font-size: 14px;
                        border-radius: 100px;
                        cursor: ${ loading ? 'default' : 'pointer' };
                        outline: none;
                        border: none;
                    }

                    button .button-spinner {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        height: 25px;
                        width: 25px;
                    }

                    button .button-text {
                        visibility: ${ loading ? 'hidden' : 'visible' }
                    }
                `}
            </style>

            {
                loading &&
                    <div className="button-spinner"><Spinner /></div>
            }

            <span className="button-text">{ text }</span>
        </button>
    );
}
