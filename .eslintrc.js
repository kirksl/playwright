module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-return-await': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'eol-last': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  }
};
