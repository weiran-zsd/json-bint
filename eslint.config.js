'use strict'

const jsPlugin = require('@eslint/js')
const esmConfig = require('eslint-plugin-n/configs/recommended-module.js')
const cjsConfig = require('eslint-plugin-n/configs/recommended-script.js')

module.exports = [
  jsPlugin.configs.recommended,
  {
    files: ['**/*.mjs'],
    ...esmConfig,
  },
  {
    files: ['**/*.{js,cjs}'],
    ...cjsConfig,
  },
]
