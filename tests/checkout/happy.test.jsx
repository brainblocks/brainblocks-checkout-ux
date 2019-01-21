/* @flow */

import React from 'react';
import { render } from 'react-testing-library';
import { wrapPromise } from 'belter';

import Checkout from '../../pages/checkout';
import { setupMocks } from '../util';

beforeEach(() => {
    setupMocks();
});

test('Renders checkout component and clicks pay to complete a transaction', async () => {
    return await wrapPromise(({ expect }) => {
        setupMocks({
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
                })
            }
        });
    
        const { getByTestId } = render(<Checkout />);

        getByTestId('pay-button').click();
    });
});
