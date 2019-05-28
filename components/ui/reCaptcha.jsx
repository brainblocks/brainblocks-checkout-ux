/* @flow */

import React, { type Element } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { RECAPTCHA_KEY } from '../../config';

type ReCaptchaProps = {|
    onChange : () => void,
    valid? : boolean,
    validationEnabled? : boolean,
    validationMessage? : string
|};

export function ReCaptcha({ onChange, valid, validationEnabled, validationMessage } : ReCaptchaProps) : Element<*> {
    return (
        <section>
            <style jsx>
                {`
                    .re-captcha {
                        border: ${ (validationEnabled && !valid) ? '2px solid #e44545' : 'none' };
                        overflow: ${ (validationEnabled && !valid) ? 'hidden' : 'visible' };
                        border-radius: 6px;
                        min-height: 80px;
                    }

                    .validation-message {
                        color: #e44545;
                        font-size: 10px;
                        margin-top: 3px;
                    }
                `}
            </style>

            <section className="re-captcha">
                <ReCAPTCHA
                    size="normal"
                    badge="inline"
                    sitekey={ RECAPTCHA_KEY }
                    onChange={ onChange }
                />
            </section>

            {
                (validationEnabled && !valid && validationMessage) &&
                    <section className='validation-message'>{ validationMessage }</section>
            }
        </section>
    );
}
