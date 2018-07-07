module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  globals: {
    __CLIENT__: false,
    __SERVER__: false,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/forbid-prop-types': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
  },
};
