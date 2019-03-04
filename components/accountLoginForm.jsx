/* @flow */

import React, { useState, type Element } from 'react';

import FacebookLogo from '../img/fb-logo.svg';
import GoogleLogo from '../img/google-logo.svg';
import ArrowIcon from '../img/arrow-icon.svg';

import { SubmitButton } from './submitButton';


export function AccountLoginForm() : Element<*> {
    const [ userName, setUser ] = useState(undefined);
    const [ password, setPassword ] = useState(undefined);

    const onSubmit = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    };

    return (
        <div>
            <style jsx>{`
            .pay-faster {
                text-transform: uppercase;
                font-size: 10px;
                color: #C4C4C4;
                font-weight: bold;
                letter-spacing: 1px;
                margin-bottom: 5px;
            }

            .login-text {
                font-weight: bold;
                color: #939393;
                margin: 0;
            }

            .form-container {
                display: flex;
                flex-direction: column;
                align-content: center;
                margin: 20px;
                width: 300px;
                display: inline-block;
                margin-top: 10px;
            } 

            input {
                border-radius: 10px;
                border: 2px solid #EAEAEA;
                padding: 10px;
                font-size: 14px;
                font-weight: bold;
                width: 100%;
            }

            input::placeholder {
                color: #EAEAEA;
                font-weight: bold;
            }

            .name {
                margin: 10px 0 5px;
            }

            .password {
                margin: 5px 0 10px;
            }

            .submit-button {
                align-self: center;
                width: 300px;
                margin-top: 20px;
            }

            .account-options {
                display: flex;
                justify-content: space-between;
            }

            .reset-text {
                font-size: 10px;
                color: #939393;
                margin: 0;
                font-weight: bold;
            }

            .new-account-link {
                color: #77B5FC;
                font-size: 10px;
                font-weight: bold;
            }

            .alt-logins {
                display: flex;
                justify-content: space-evenly;
                margin-top: 10px;
                width: 100%;
            }

            .alt-login-button {
                width: 145px;
                height: 40px;
                font-size: 14px;
                border-radius: 100px;
                border: none;
            }

            .alt-login-button-label {
                display: inline-block;
                vertical-align: middle;
                margin: 0;
                font-weight: bold;
                font-size: 14px;
            }

            .facebook {
                background-color: #4469B0;
                color: #fff;
            }

            .google {
                background-color: #F2F2F2;
                color: #727272;
            }

            .logo-container {
                width: 15px;
                height: 15px;
                margin-right: 10px;
                display: inline-block;
                vertical-align: middle;
            }

            .logo-container.arrow {
                width: 8px;
                height: 8px;
                margin-left: 2px;
                margin-bottom: 4px;
            }

            .more-info {
                display: flex;
                justify-content: center;
                margin-top: 15px;
            }

            .more-info p {
                font-size: 10px;
                margin: 0;
                font-weight: bold;
                color: #939393;
            }

            .more-info p span {
                color: #77B5FC;
                font-weight: bold;
            }

            .question-mark {
                width: 14px;
                height: 14px;
                display: inline-block;
                font-size: 10px;
                background-color: #D9D9D9;
                border-radius: 100%;
                color: white;
                margin-right: 3px;
                font-weight: bold;
            }
            `}
            </style>
            <p className="pay-faster">Pay Faster</p>
            <p className="login-text">Log into BrainBlocks</p>
            <div className="form-container">
                <input className="name" type="text" value={ userName } onChange={ (event) => setUser(event.target.value) } placeholder="email or alias" />
                <input className="password" type="password" value={ password } onChange={ (event) => setPassword(event.target.value) } placeholder="password" />
                <div className="account-options">
                    <p className="reset-text">Reset my password</p>
                    <a className="new-account-link">New Account
                        <div className="logo-container arrow">
                            <ArrowIcon />
                        </div>
                    </a>
                </div>
                <div className="submit-button">
                    <SubmitButton onSubmit={ onSubmit } text="Sign In" />
                    <div className="alt-logins">
                        <button type='button' className="alt-login-button facebook">
                            <div className="logo-container"><FacebookLogo /></div>
                            <p className="alt-login-button-label">Facebook</p>
                        </button>
                        <button type='button' className="alt-login-button google">
                            <div className="logo-container"><GoogleLogo /></div>
                            <p className="alt-login-button-label">Google</p>
                        </button>
                    </div>
                    <div className="more-info">
                        <div className="question-mark">?</div>
                        <p>What is this? <span>Learn more</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

AccountLoginForm.displayName = 'Account Login Form';
