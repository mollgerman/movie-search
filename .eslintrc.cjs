module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'plugin:react/recommended',
      'standard'
    ],
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: [
      'react'
    ],
    rules: {
      'in-props-validation': 'off',
      'react/prop-types': 'off',
      'object-curly-spacing': ['error', 'always'],
      indent: ['error', 2],
      'space-before-blocks': 2,
      // suppress errors for missing 'import React' in files
      'react/react-in-jsx-scope': 'off',
      // allow jsx syntax in js files (for next.js project)
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }] // should add ".ts" if typescript project
    }
  }
  