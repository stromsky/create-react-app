'use strict';

module.exports = {
  'extends': [
    'standard', 'standard-react', 'flowtype', 'react-hooks'
  ],
  'env': {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  'rules': {
    'react/prop-types': ['warn', { 'skipUndeclared': true }],

    // https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',

    // https://github.com/gajus/eslint-plugin-flowtype
    'flowtype/define-flow-type': 'warn',
    'flowtype/require-valid-file-annotation': 'warn',
    'flowtype/use-flow-type': 'warn',  
  },
  'parser': 'babel-eslint',

  /*
  Babel parser does not support static props yet
  https://github.com/eslint/eslint/issues/8720
  Adding to support concise React prop validation
  */
  'globals': {
    'propTypes': true,
    'defaultProps': true
  }
}
