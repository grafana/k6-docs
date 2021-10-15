module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['markdown'],
  overrides: [
    {
      // Enable the Markdown processor for all .md files.
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      // Customize the configuration ESLint uses for ```js, ```javascript
      files: ['**/*.md/*.js', '**/*.md/*.javascript'],
      rules: {
        'no-undef': 'error',
        'no-else-return': 'error',
        'no-extra-boolean-cast': 'error',
        'no-duplicate-case': 'error',
        'no-const-assign': 'error',
        'no-dupe-args': 'error',
        'no-dupe-else-if': 'error',
        'no-var': 'error',
        'use-isnan': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      },
    },
  ],
  globals: {
    console: 'readonly',
    __VU: 'readonly',
    __ENV: 'readonly',
    __ITER: 'readonly',
  },
};
