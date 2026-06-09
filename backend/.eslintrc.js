module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
    'max-len': ['error', { code: 120 }],
    'global-require': 'off',
  },
};
