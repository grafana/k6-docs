module.exports = {
  root: true,
  env: {
    es2022: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: '2024',
    sourceType: 'module',
    requireConfigFile: false, // <== ADD THIS
  },
  extends: ['plugin:mdx/recommended', 'plugin:prettier/recommended'],
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
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'prefer-const': 'error',
      },
    },
  ],
  globals: {
    console: 'readonly',
    __VU: 'readonly',
    __ENV: 'readonly',
    __ITER: 'readonly',
    open: 'readonly',
    window: 'readonly',
    setInterval: 'readonly',
    clearInterval: 'readonly',
    setTimeout: 'readonly',
    clearTimeout: 'readonly',
  },
};
