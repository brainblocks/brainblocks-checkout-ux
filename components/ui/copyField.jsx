/* @flow */

import React, { useState, type Element } from 'react';
import copy from 'copy-to-clipboard';

import { TextInput } from './textInput';

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
        <TextInput
            pointer
            label={ label }
            value={ copied ? 'Copied!' : text }
            center={ copied ? true : false }
            onClick={ handleClick }
            backgroundColor={ copied ? '#5AB666' : '#eee' }
            borderColor={ copied ? '#5AB666' : '#eee' }
            textColor={ copied ? '#fff' : '#666' }
        />
    );
}
