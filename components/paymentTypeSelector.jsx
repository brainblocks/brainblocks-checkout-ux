/* @flow */

import React, { useState } from 'react';

export const PaymentTypeSelector = ({ pages, onSelect }) => {
    const [ tab, setTab ] = useState('wallet');

    const onClick = (tabType) => {
        setTab(tabType);
        if (onSelect) {
            onSelect(tabType);
        }
    };

    return (
        <section className="selector-button-container">
            <style jsx>{`
                .selector-button-container {
                    background-color: #fff;
                    border-radius: 50px;
                    height: 55px;
                    width: 320px;
                    display: inline-block;
                    box-shadow: 3px 3px 18px #eee;
                }

                ul {
                    margin: 0;
                    list-style: none;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 10px;
                }

                button {
                    border-radius: 100px;
                    font-size: 14px;
                    font-weight: bold;
                    padding: 5px 20px;
                    border: none;
                    height: 35px;
                    width: 100px;
                    outline: none;
                    cursor: pointer;
                }

                .active {
                    background-image: linear-gradient(to right, #70B0F8 40%, #4088dc 100%);
                    color: #fff;
                }

                .inactive {
                    background-color: #fff;
                    color: #939393;
                }
            `}
            </style>
            <ul>
                {
                    pages.map(page =>
                        (
                            <li>
                                <button
                                    type="button"
                                    className={ `${ (tab === page.name) ? 'active' : 'inactive' }` }
                                    onClick={ () => onClick(page.name) } >
                                    { page.label }
                                </button>
                            </li>
                        ))
                }
            </ul>
        </section>
    );
};

PaymentTypeSelector.displayName = 'Payment Type Selector';
