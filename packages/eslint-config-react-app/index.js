'use strict'

module.exports = {
  'extends': [
    'standard', 'standard-react'
  ],
  'env': {
    'jest': true
  },
  'plugins': [
    'react-hooks'
  ],
  'rules': {
    'react/prop-types': ['warn', { 'skipUndeclared': true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'promise/catch-or-return': 'warn'
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
