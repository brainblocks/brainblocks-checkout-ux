/* @flow */

import React, { useRef, useEffect, type Element } from 'react';

import { noop } from '../../lib';
import { KEYCODE } from '../../constants/events';

type TextInputProps = {|
    label? : string,
    value? : string,
    placeholder? : string,
    type? : string,
    onChange? : (SyntheticInputEvent<EventTarget>) => void, // eslint-disable-line no-undef
    onValueChange? : (string) => void,
    onClick? : (Event) => void,
    onEnter? : (Event) => void,
    backgroundColor? : string,
    placeholderColor? : string,
    borderColor? : string,
    center? : boolean,
    textColor? : string,
    pointer? : boolean,
    autoFocus? : boolean,
    valid? : boolean,
    validationEnabled? : boolean,
    validationMessage? : string
|};

export function TextInput({
    label = '',
    value = '',
    placeholder = '',
    type = 'text',
    onChange = noop,
    onValueChange = noop,
    onClick = noop,
    onEnter = noop,
    backgroundColor = '#ffffff',
    borderColor = '#eaeaea',
    placeholderColor = '#d6d2d2',
    center = false,
    textColor = '#333',
    pointer = false,
    valid = true,
    autoFocus = false,
    validationEnabled = false,
    validationMessage = ''
} : TextInputProps) : Element<*> {

    const handleChange = (event) => {
        onChange(event);
        onValueChange(event.target.value);
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === KEYCODE.ENTER) {
            onEnter(event);
        }
    };

    const input = useRef();
    
    useEffect(() => {
        if (autoFocus && input.current) {
            input.current.focus();
        }
    }, [ autoFocus, input.current ]);

    return (
        <section>
            <style jsx>
                {`
                    label {
                        display: block;
                        text-transform: uppercase;
                        font-size: 8px;
                        color: #C4C4C4;
                        font-weight: bold;
                        letter-spacing: 1px;
                        margin-bottom: 5px;
                        margin-top: 20px;
                    }

                    input {
                        width: 100%;
                        background-color: ${ backgroundColor };
                        text-align: ${ center ? 'center' : 'left' };
                        border: 2px solid ${ (validationEnabled && !valid) ? '#e44545' : borderColor };
                        font-weight: bold;
                        font-size: 14px;
                        padding: 10px 12px;
                        color: ${ textColor };
                        border-radius: 6px;
                        -webkit-user-select: none;
                        -khtml-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        outline: none;
                        transition: background-color 0.1s;
                        cursor: ${ pointer ? 'pointer' : 'default' }
                    }

                    input:focus {
                        outline: none;
                    }

                    input::placeholder {
                        color: ${ placeholderColor }
                    }

                    .validation-message {
                        color: #e44545;
                        font-size: 10px;
                        margin-top: 3px;
                    }
                `}
            </style>

            {
                label &&
                    <label>{ label }</label>
            }
        
            <input
                ref={ input }
                type={ type }
                value={ value }
                placeholder={ placeholder }
                onClick={ onClick }
                onMouseDown={ onClick }
                onChange={ handleChange }
                onKeyUp={ handleKeyUp }
                spellCheck='false'
            />

            {
                (validationEnabled && !valid && validationMessage) &&
                    <section className='validation-message'>{ validationMessage }</section>
            }
        </section>
    );
}
