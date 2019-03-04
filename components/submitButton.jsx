/* @flow */

import React, { useState, type Element } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../lib/util';

import { Spinner } from './spinner';

type SubmitButtonProps = {|
    onSubmit : () => void | Promise<void>,
    text : string
|};

export function SubmitButton({ onSubmit, text } : SubmitButtonProps) : Element<*> {
    const [ loading, setLoading ] = useState(false);

    const onClick = () => {
        setLoading(true);
        Promise.resolve(onSubmit()).then(() => setLoading(false));
    };

    return (
        <button type='button' onClick={ onClick }>
            <style jsx>{`
                button {
                    position: relative;
                    width: 100%;
                    background-color: #5AB666;
                    padding: 10px 0;
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                    border-radius: 100px;
                    cursor: pointer;
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
            {loading && <div className="button-spinner"><Spinner /></div>}
            <span className="button-text">{ text }</span>
        </button>
    );
}

SubmitButton.displayName = 'Submit Button';

SubmitButton.propTypes = {
    onSubmit: PropTypes.func,
    text:     PropTypes.string
};

SubmitButton.defaultProps = {
    onSubmit: noop,
    text:     ''
};
