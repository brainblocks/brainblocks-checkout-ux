/* @flow */

import React, { type Element } from 'react';

export function Spinner() : Element<*> {
    return (
        <div className="spinner">
            <style jsx>
                {`
                    .spinner {
                        height: 100%;
                        width: 100%;
                        border: 2px solid rgba(0, 0, 0, .2);
                        border-top-color: rgba(255, 255, 255, 0.8);
                        border-radius: 100%;
                        animation: rotation .7s infinite linear;
                    }
                    @keyframes rotation {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(359deg);
                        }
                    }
                `}
            </style>
        </div>
    );
}
