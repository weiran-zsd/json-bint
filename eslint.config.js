import jsPlugin from '@eslint/js'
import esmConfig from 'eslint-plugin-n/configs/recommended-module.js'
import cjsConfig from 'eslint-plugin-n/configs/recommended-script.js'

export default [
  jsPlugin.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    ...esmConfig,
  },
  {
    files: ['**/*.cjs'],
    ...cjsConfig,
  },
]
