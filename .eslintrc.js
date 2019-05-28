/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc-browser.js',

    'rules': {
        'import/no-default-export': 'off',
        'react/prop-types': 'off',
        'promise/no-native': 'off',
        'no-restricted-globals': 'off',
        'compat/compat': 'off',
        'react/require-default-props': 'off',
        'react/forbid-component-props': 'off'
    },

    'globals': {
        'brainblocks': true
    }
};