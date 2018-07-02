module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
