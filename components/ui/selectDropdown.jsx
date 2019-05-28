/* @flow */

import React, { useState, type Element } from 'react';

import { KEYCODE } from '../../constants/events';

type SelectDropdownProps = {|
    value : string,
    options : $ReadOnlyArray<{|
        value : string,
        label : string
    |}>,
    onChange : (string) => void
|};


export function SelectDropdown({ value, options, onChange } : SelectDropdownProps) : Element<*> {
    
    const [ selectedValue, setSelectedValue ] = useState(value);
    const [ expanded, setExpanded ] = useState(false);

    const selectedOption = options.find(option => (option.value === selectedValue));

    if (!selectedOption) {
        throw new Error(`Can not find option for value: ${ value }`);
    }

    const { label } = selectedOption;

    const toggleDropdown = () => {
        setExpanded(!expanded);
    };

    const handleChange = (newValue) => {
        setSelectedValue(newValue);
        setExpanded(false);
        onChange(newValue);
    };

    const handleKeydown = (event, newValue) => {
        if (event.keyCode === KEYCODE.ENTER) {
            handleChange(newValue);
        }
    };

    return (
        <section className='select'>
            <style jsx>
                {`
                    .select {
                        position: relative;
                    }

                    .selected-option {
                        border: 2px solid #eaeaea;
                        font-weight: bold;
                        font-size: 14px;
                        padding: 10px 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        text-align: left;
                        color: #333;
                    }

                    .selected-option:focus {
                        outline: none;
                    }

                    .other-options {
                        position: absolute;
                        top: 42px;
                        margin-top: 10px;
                        background: white;
                        border-radius: 6px;
                        width: 100%;
                        box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
                        overflow: hidden;
                        z-index: 1000;
                    }

                    .option {
                        font-weight: bold;
                        font-size: 14px;
                        padding: 10px 12px;
                        text-align: left;
                        cursor: pointer;
                        padding: 10px 12px;
                    }

                    .option:hover, .option:focus {
                        outline: none;
                        background-color: rgb(116, 180, 255);
                        color: #fff;
                    }
                `}
            </style>

            <section className='selected-option' onClick={ toggleDropdown } tabIndex='0'>
                { label }
            </section>

            {
                expanded && (
                    <section className='other-options'>
                        {
                            options
                                .filter(option => (option.value !== selectedValue))
                                .map(option => (
                                    <section
                                        className='option'
                                        tabIndex='0'
                                        onKeyDown={ (event) => handleKeydown(event, option.value) }
                                        onClick={ () => handleChange(option.value) }
                                    >
                                        { option.label }
                                    </section>
                                ))
                        }
                    </section>
                )
            }
        </section>
    );
}
