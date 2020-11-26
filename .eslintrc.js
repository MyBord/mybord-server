module.exports = {
  env: {
    'jest/globals': true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    'document': true,
    'window': true,
    'gapi': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'jest', 'graphql'],
  rules: {
    '@typescript-eslint/camelcase': ['error', { 'properties': 'never' }],
    'indent': 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        'ignoredNodes': ['JSXElement'],
        'SwitchCase': 1,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': ['error', {
      'allowExpressions': true,
      'allowTypedFunctionExpressions': true
    }],
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/extensions': [
      '.js',
      '.ts',
    ],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      webpack: {
        config: 'webpack.common.js',
      }
    }
  },
};
