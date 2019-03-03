/* @flow */

import React, { useState } from 'react';

import { SubmitButton } from './submitButton';

export const AccountLoginForm = () => {
    const [ userName, setUser ] = useState(undefined);
    const [ password, setPassword ] = useState(undefined);

    const onSubmit = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('success! :)');
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
            `}
            </style>
            <p className="pay-faster">Pay Faster</p>
            <p className="login-text">Log into BrainBlocks</p>
            <div className="form-container">
                <input className="name" type="text" value={ userName } onChange={ (event) => setUser(event.target.value) } placeholder="email or alias" />
                <input className="password" type="text" value={ password } onChange={ (event) => setPassword(event.target.value) } placeholder="password" />
                <div className="submit-button">
                    <SubmitButton onSubmit={ onSubmit } text="Sign In" />
                </div>
            </div>
        </div>
    );
};

AccountLoginForm.displayName = 'Account Login Form';
