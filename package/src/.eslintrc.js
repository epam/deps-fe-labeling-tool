module.exports = {
  env: {
    browser: true,
    commonjs: false
  },
  plugins: [
    'jsx-a11y',
    'jest',
    'react'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended'
  ],
  rules: {
    'react/no-unused-prop-types': 'error',
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['validate*', 'expect*']
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/mocks/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal'
          },
          {
            pattern: 'constants/**',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: [
          'react'
        ],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
