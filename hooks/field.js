/* @flow */

import { useState, useEffect } from 'react';

type FieldValue<T> = {|
    value : T | void,
    setValue : (T) => void,
    validationEnabled : boolean,
    enableValidation : () => void,
    disableValidation : () => void,
    valid : boolean,
    setValid : () => void,
    setInvalid : (message? : string) => void,
    validationMessage : string,
    setValidationMessage : (string) => void
|};

type FieldValueOptions<T> = {|
    def? : T,
    validator : (FieldValue<T>) => void
|};

export function useFieldValue<T>({ validator, def } : FieldValueOptions<T>) : FieldValue<T> {
    const [ value, setValue ] = useState(def);
    
    const [ valid, _setValid ] = useState(true);
    const [ validationEnabled, setValidationEnabled ] = useState(false);
    const [ validationMessage, setValidationMessage ] = useState('');

    const enableValidation = () => setValidationEnabled(true);
    const disableValidation = () => setValidationEnabled(false);

    const setValid = () => {
        _setValid(true);
    };

    const setInvalid = (message = '') => {
        _setValid(false);
        setValidationMessage(message);
    };

    const fieldValue = { value, setValue, validationEnabled, enableValidation, disableValidation, valid, setValid, setInvalid, validationMessage, setValidationMessage };

    useEffect(() => {
        if (validator) {
            validator(fieldValue);
        }
    }, [ value ]);

    return fieldValue;
}
