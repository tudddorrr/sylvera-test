import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@stylistic': stylistic
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      'no-console': ['warn'],
    }
  },
]

export default eslintConfig
