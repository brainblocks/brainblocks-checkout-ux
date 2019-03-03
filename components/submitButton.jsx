/* @flow */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../lib/util';

export const SubmitButton = ({ onSubmit, text }) => {
    const [ loading, setLoading ] = useState(false);

    const onClick = () => {
        setLoading(true);
        Promise.resolve(onSubmit()).then(() => setLoading(false));
    };

    return (
        <button onClick={ onClick }>
            <style jsx>{`
                button {
                  position: relative;
                  height: 40px;
                  width: 100%;
                  background-color: #5AB666;
                  color: white;
                  font-weight: bold;
                  font-size: 14px;
                  border-radius: 100px;
                  cursor: pointer;
                  outline: none;
                  border: none;
                }

                .spinner {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  height: 25px;
                  width: 25px;
                  box-sizing: border-box;
                  border: 3px solid rgba(0, 0, 0, .2);
                  border-top-color: rgba(255, 255, 255, 0.8);
                  border-radius: 100%;
                  animation: rotation .7s infinite linear;
              }
              @keyframes rotation {
                  from {
                      transform: translateX(-50%) translateY(-50%) rotate(0deg);
                  }
                  to {
                      transform: translateX(-50%) translateY(-50%) rotate(359deg);
                  }
              }
            `}
            </style>
            {loading && <div className="spinner" />}
            {!loading && text}
        </button>
    );
};

SubmitButton.displayName = 'Submit Button';

SubmitButton.propTypes = {
    onSubmit: PropTypes.func,
    text:     PropTypes.string
};

SubmitButton.defaultProps = {
    onSubmit: noop,
    text:     ''
};
