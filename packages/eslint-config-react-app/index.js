'use strict';

module.exports = {
  'extends': [
    'standard', 'standard-react'
  ],
  'env': {
    'jest': true
  },
  'rules': {
    'react/prop-types': ['warn', { 'skipUndeclared': true }]
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
