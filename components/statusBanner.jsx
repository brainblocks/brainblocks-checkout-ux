/* @flow */

import React, { useState, useEffect, type Element } from 'react';

import { PAYMENT_STATUS } from '../config/constants';
import { noop } from '../lib';

const SETTINGS = {
    [ PAYMENT_STATUS.PENDING ]:  {
        text: 'Waiting for payment'
    },
    [ PAYMENT_STATUS.RECEIVED ]: {
        text: 'Completed'
    }
};

type StateBannerProps = {|
    status : $Values<typeof PAYMENT_STATUS>,
    onTimeout? : () => void
|};

export function StatusBanner({ status, onTimeout = noop } : StateBannerProps) : Element<*> {
    const { text } = SETTINGS[status];

    const totalTime = 5 * 60;
    const [ percentageComplete, setPercentageComplete ] = useState(50);

    useEffect(() => {
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            const percComplete = Math.min((elapsedTime / totalTime) * 100, 100);
            setPercentageComplete(percComplete);

            if (percentageComplete >= 100) {
                clearInterval(interval);
                onTimeout();
            }
        }, 50);
    }, []);

    return (
        <section>
            <style jsx>
                {`
                    section {
                        position: relative;
                        height: 25px;
                    }

                    .status-loader-text {
                        position: absolute;
                        top: 0;
                        left: 0;
                        color: #fff;
                        height: 100%;
                        width: 100%;
                        text-transform: uppercase;
                        font-size: 10px;
                        text-align: center;
                        line-height: 25px;
                        font-weight: bold;
                        letter-spacing: 1px;
                        z-index: 100;
                    }

                    .status-loader-foreground {
                        width: ${ percentageComplete }%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: #5AB666;
                        z-index: 90;
                    }

                    .status-loader-background {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: #999;
                        z-index: 80;
                    }
                `}
            </style>

            <div className='status-loader-text'>{ text }</div>
            <div className='status-loader-background' />
            <div className='status-loader-foreground' />
            

        </section>
    );
}
