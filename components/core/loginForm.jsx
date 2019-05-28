/* @flow */

import React, { useState, useRef, type Element } from 'react';

import { hash, type WalletType, getLocalStorage, setLocalStorage } from '../../lib';
import { login, TwoFactorAuthError, AuthError } from '../../api/auth';
import { SubmitButton } from '../ui/submitButton';
import { TextInput } from '../ui/textInput';
import { ReCaptcha } from '../ui/reCaptcha';
import { useFieldValue } from '../../hooks/field';
import { LOCAL_STORAGE_KEY } from '../../constants/storage';

type LoginFormProps = {|
    onLogin : ({
        token : string,
        username : string,
        password : string,
        name : string,
        encryptedWallet : WalletType
    }) => void
|};

export function LoginForm({ onLogin } : LoginFormProps) : Element<*> {

    const username = useFieldValue({
        def:       getLocalStorage(LOCAL_STORAGE_KEY.USERNAME),
        validator: ({ value, setInvalid }) => {
            if (!value) {
                setInvalid('Please enter a username');
            }
        }
    });

    const password = useFieldValue({
        validator: ({ value, setInvalid }) => {
            if (!value) {
                setInvalid('Please enter a password');
            }
        }
    });

    const captcha = useFieldValue({
        validator: ({ value, setInvalid }) => {
            if (!value) {
                setInvalid('Please confirm the captcha');
            }
        }
    });

    const twoFactorCode = useFieldValue({
        validator: ({ value, setInvalid }) => {
            if (!value || !value.match(/^\d{6}$/)) {
                setInvalid('Please enter a six-digit two factor code');
            }
        }
    });

    const submitButton = useRef();

    const submitForm = () => {
        if (submitButton.current) {
            submitButton.current.submit();
        }
    };

    const [ twoFactorRequested, setTwoFactorRequested ] = useState(false);

    const handleLogin = () => {
        username.enableValidation();
        password.enableValidation();
        captcha.enableValidation();

        if (twoFactorRequested) {
            twoFactorCode.enableValidation();
        }

        if (!username.valid || !password.valid || !captcha.valid || (twoFactorRequested && !twoFactorCode.valid)) {
            return;
        }

        return hash(password.value, username.value).then(hashedPassword => {
            return login({
                username:  username.value,
                password:  hashedPassword,
                recaptcha: captcha.value,
                token2fa:  twoFactorCode.value
            });

        }).then(({ token, user }) => {
            setLocalStorage(LOCAL_STORAGE_KEY.USERNAME, user.username);

            const name = user.firstName || user.username;
            const encryptedWallet = user.vault.wallet;

            return onLogin({
                username: username.value,
                password: password.value,
                name,
                token,
                encryptedWallet
            });

        }).catch(err => {
            if (err instanceof AuthError) {
                username.setInvalid('Please enter a valid username');
                password.setInvalid('Please enter a valid password');

                if (twoFactorCode.value) {
                    twoFactorCode.setInvalid('Please enter a valid two factor code');
                }

            } else if (err instanceof TwoFactorAuthError) {
                setTwoFactorRequested(true);
            } else {
                throw err;
            }
        });
    };

    return (
        <div>
            <style jsx>
                {`
                    .input-field, .submit-button {
                        margin-top: 10px;
                    }

                    .captcha {
                        margin-top: 0;
                        margin-bottom: 5px;
                    }
                `}
            </style>

            {
                twoFactorRequested

                    ? (
                        <div className="form-container">
                            <section className="input-field">
                                <TextInput
                                    value={ twoFactorCode.value }
                                    onValueChange={ twoFactorCode.setValue }
                                    placeholder='2FA Code'
                                    valid={ twoFactorCode.valid }
                                    validationEnabled={ twoFactorCode.validationEnabled }
                                    validationMessage={ twoFactorCode.validationMessage }
                                    onEnter={ submitForm }
                                    autoFocus
                                />
                            </section>

                            <section className="submit-button">
                                <SubmitButton
                                    buttonRef={ submitButton }
                                    onSubmit={ handleLogin }
                                    text="Submit 2FA Code"
                                />
                            </section>
                        </div>
                    )

                    : (
                        <div className="form-container">
                            <section className="input-field">
                                <TextInput
                                    value={ username.value }
                                    onValueChange={ username.setValue }
                                    placeholder='username'
                                    valid={ username.valid }
                                    validationEnabled={ username.validationEnabled }
                                    validationMessage={ username.validationMessage }
                                    onEnter={ submitForm }
                                    autoFocus={ Boolean(!username.value) }
                                />
                            </section>

                            <section className="input-field">
                                <TextInput
                                    type='password'
                                    value={ password.value }
                                    onValueChange={ password.setValue }
                                    placeholder='password'
                                    valid={ password.valid }
                                    validationEnabled={ password.validationEnabled }
                                    validationMessage={ password.validationMessage }
                                    onEnter={ submitForm }
                                    autoFocus={ Boolean(username.value) }
                                />
                            </section>
                            
                            <section className="input-field">
                                <ReCaptcha
                                    onChange={ captcha.setValue }
                                    valid={ captcha.valid }
                                    validationEnabled={ captcha.validationEnabled }
                                    validationMessage={ captcha.validationMessage }
                                    onEnter={ submitForm }
                                />
                            </section>

                            <section className="submit-button">
                                <SubmitButton
                                    buttonRef={ submitButton }
                                    onSubmit={ handleLogin }
                                    text="Sign In"
                                />
                            </section>
                        </div>
                    )
            }
        </div>
    );
}
