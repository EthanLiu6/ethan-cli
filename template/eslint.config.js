import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import configPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  configPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
