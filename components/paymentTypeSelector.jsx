/* @flow */

import React, { useState } from 'react';

export const PaymentTypeSelector = () => {
    const [ tab, setTab ] = useState('wallet');

    const onSelect = (tabType) => {
        setTab(tabType);
    };

    return (
        <section className="selector-button-container">
            <style jsx>{`
              .selector-button-container {
                background-color: #fff;
                border-radius: 50px;
                height: 50px;
                width: 320px;
              }

              ul {
                list-style: none;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 7px;
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
                <li><button className={ `${ (tab === 'wallet') ? 'active' : 'inactive' }` } onClick={ () => onSelect('wallet') } type="button" >Wallet</button></li>
                <li><button className={ `${ (tab === 'scan') ? 'active' : 'inactive' }` } onClick={ () => onSelect('scan') } type="button" >Scan</button></li>
                <li><button className={ `${ (tab === 'copy') ? 'active' : 'inactive' }` } onClick={ () => onSelect('copy') } type="button" >Copy</button></li>
            </ul>
        </section>
    );
};

PaymentTypeSelector.displayName = 'Payment Type Selector';
