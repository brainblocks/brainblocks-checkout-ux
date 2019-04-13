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

type StatusBannerProps = {|
    status : $Values<typeof PAYMENT_STATUS>,
    time? : number,
    onTimeout? : () => void
|};

export function StatusBanner({ status, timeout = 10 * 60, onTimeout = noop } : StatusBannerProps) : Element<*> {
    const { text } = SETTINGS[status];

    const [ elapsed, setElapsed ] = useState(0);
    let [ percentageComplete, setPercentageComplete ] = useState(0);

    useEffect(() => {
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            const percComplete = Math.min((elapsedTime / timeout) * 100, 100);

            setElapsed(parseInt(elapsedTime));
            setPercentageComplete(percComplete);

            if (percentageComplete >= 100) {
                clearInterval(interval);
                onTimeout();
            }
        }, 1000);
    }, []);

    let statusMessage;

    if (status === PAYMENT_STATUS.RECEIVED) {
        statusMessage = text;
        percentageComplete = 100;

    } else {
        const remaining = timeout - elapsed;
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
    
        const remainingFormatted = minutes
            ? `${ minutes }:${ seconds < 10 ? '0' : '' }${ seconds }`
            : `${ seconds } seconds`;
            
        statusMessage = `${ text } (${ remainingFormatted })`;
    }

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
                        background-color: #cecece;
                        z-index: 80;
                    }
                `}
            </style>

            <div className='status-loader-text'>{ statusMessage }</div>
            <div className='status-loader-background' />
            <div className='status-loader-foreground' />
            

        </section>
    );
}
