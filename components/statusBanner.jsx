/* @flow */

import React, { type Element } from 'react';

import { PAYMENT_STATUS } from '../config/constants';

const SETTINGS = {
    [ PAYMENT_STATUS.PENDING ]:  {
        text:            'Waiting for payment',
        textColor:       '#ffffff',
        backgroundColor: '#dddddd'
    },
    [ PAYMENT_STATUS.RECEIVED ]: {
        text:            'Completed',
        textColor:       '#ffffff',
        backgroundColor: '#4ca76f'
    }
};

type StateBannerProps = {|
    status : $Values<typeof PAYMENT_STATUS>
|};

export function StatusBanner({ status } : StateBannerProps) : Element<*> {
    const settings = SETTINGS[status];

    return (
        <section>
            <style jsx>
                {`
                    .status-banner {
                        background: ${ settings.backgroundColor };
                        color: ${ settings.textColor };
                        text-transform: uppercase;
                        font-size: 10px;
                        text-align: center;
                        padding: 6px 0;
                        font-weight: bold;
                        letter-spacing: 1px;
                    }

                `}
            </style>

            <div className='status-banner'>{ settings.text }</div>
        </section>
    );
}
