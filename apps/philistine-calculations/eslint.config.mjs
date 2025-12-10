import vue from 'eslint-plugin-vue'
import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: await import('@typescript-eslint/parser'),
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
