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
  extends: ['plugin:prettier/recommended'],
  plugins: ['markdown'],
  overrides: [
    {
      // Enable the Markdown processor for all .md files.
      files: ['**/*.md'],
      processor: 'markdown/markdown',
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
