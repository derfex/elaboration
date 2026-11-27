import esLintPlaywrightPlugin from 'eslint-plugin-playwright'
import baseConfig from '../../eslint.config.mjs'

export default [
  esLintPlaywrightPlugin.configs['flat/recommended'],
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
  },
]
