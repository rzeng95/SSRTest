module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  globals: {
    __CLIENT__: false,
    __SERVEr: false,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-curly-spacing': 'off',
  },
};
