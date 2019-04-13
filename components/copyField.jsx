/* @flow */

import React, { useState, useEffect, type Element } from 'react';
import copy from 'copy-to-clipboard';

type CopyFieldProps = {|
    label : string,
    text : string
|};


export function CopyField({ label, text } : CopyFieldProps) : Element<*> {

    const [ copied, setCopied ] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        if (copied) {
            return false;
        }
        copy(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
        return false;
    };

    return (
        <section>
            <style jsx global>
                {`
                    .label {
                        text-transform: uppercase;
                        font-size: 8px;
                        color: #C4C4C4;
                        font-weight: bold;
                        letter-spacing: 1px;
                        margin-bottom: 5px;
                        margin-top: 20px;
                    }

                    .text {
                        width: 100%;
                        background-color: #eee;
                        text-align: left;
                        border: none;
                        font-weight: bold;
                        font-size: 14px;
                        padding: 10px 12px;
                        color: #666;
                        cursor: pointer;
                        border-radius: 6px;
                        -webkit-user-select: none;
                        -khtml-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        outline: none;
                        transition: background-color 0.1s;
                    }

                    .text.copied {
                        background-color: #5AB666;
                        text-align: center;
                        color: #fff;
                    }

                    .text:focus {
                        outline: none;
                    }
                `}
            </style>
            <p className="label">{ label }</p>
            <input type="text" className={ `text ${ copied ? 'copied' : 'pending' }` } value={ copied ? 'Copied!' : text } onClick={ handleClick } onMouseDown={ handleClick } spellcheck="false" />
        </section>
    );
}
