module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'linebreak-style': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    'object-curly-newline': 'off',
    'max-len': ['error', { code: 140, ignoreUrls: true, ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['vite.config.js', 'vite.config.*', '**/*.test.*'] }],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
  },
};
