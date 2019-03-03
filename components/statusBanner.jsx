/* @flow */

import React, { useState, useEffect, type Element } from 'react';

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

    const totalTime = 60;

    const [ percentageComplete, setPercentageComplete ] = useState('100.0');

    useEffect(() => {
        const startTime = Date.now();
        
        setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            const percComplete = Math.min((elapsedTime / totalTime) * 100, 100);
            setPercentageComplete(percComplete.toFixed(2));
        }, 50);
    }, []);

    return (
        <section>
            <style jsx>
                {`
                    section {
                        position: relative;
                    }

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

                    .status-loader {
                        width: ${ percentageComplete }%;
                        height: 100%;
                        background: background-image: linear-gradient(to right, #70B0F8 40%, #4088dc 100%);
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                `}
            </style>

            <div className='status-banner'>{ settings.text }</div>
            <div className='status-loader' />
            
        </section>
    );
}
