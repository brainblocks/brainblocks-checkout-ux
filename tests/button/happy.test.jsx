/* @flow */

import React from 'react';
import { render } from 'react-testing-library';
import { wrapPromise } from 'belter';

import Button from '../../pages/button';
import { setupMocks } from '../util';

beforeEach(() => {
    setupMocks();
});

test('Renders button component and clicks button to render checkout', async () => {
    return await wrapPromise(({ expect }) => {
        const expectedToken = 'abc123';

        setupMocks({
            brainblocks: {
                Checkout: expect('Checkout', ({ transaction, onComplete }) => {
                    if (transaction !== window.xprops.transaction) {
                        throw new Error(`Expected transaction to be window.xprops.transaction`);
                    }
        
                    if (onComplete !== window.xprops.onComplete) {
                        throw new Error(`Expected onComplete to be window.xprops.onComplete`);
                    }
        
                    return {
                        renderTo: expect('renderTo', (win, element) => {
                            if (win !== window.top) {
                                throw new Error(`Expected renderTo window to be window.top`);
                            }
        
                            if (!element || typeof element !== 'string') {
                                throw new Error(`Expected valid element to be passed to renderTo`);
                            }
        
                            onComplete({
                                token: expectedToken
                            });
                        })
                    };
                })
            },

            xprops: {
                transaction: {
                    currency:    'nano',
                    amount:      '1000',
                    destination: 'nano_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji'
                },
    
                onComplete: expect('onComplete', ({ token }) => {
                    if (!token || typeof token !== 'string') {
                        throw new Error(`Expected valid token to be passed`);
                    }
        
                    if (token !== expectedToken) {
                        throw new Error(`Expected token to be ${ expectedToken }, got ${ token }`);
                    }
                })
            }
        });
    
        const { getByTestId } = render(<Button />);

        getByTestId('checkout-button').click();
    });
});
