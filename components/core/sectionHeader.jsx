/* @flow */

import React, { type Element } from 'react';

type SectionHeaderProps = {|
    subheader : string,
    header : string
|};

export function SectionHeader({ subheader, header } : SectionHeaderProps) : Element<*> {
    return (
        <div>
            <style jsx>{`
                .subheader {
                    text-transform: uppercase;
                    font-size: 10px;
                    color: #C4C4C4;
                    font-weight: bold;
                    letter-spacing: 1px;
                    margin-bottom: 5px;
                }

                .header {
                    font-weight: bold;
                    color: #939393;
                    margin: 0;
                    font-size: 16px;
                }
            `}
            </style>

            <h3 className="subheader">{ subheader }</h3>
            <h2 className="header">{ header }</h2>
        </div>
    );
}
