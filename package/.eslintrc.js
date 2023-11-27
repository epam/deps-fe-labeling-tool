module.exports = {
  root: true,
  env: {
    commonjs: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'only-error',
    'indent-class-properties',
    'notice',
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'prefer-regex-literals': 'off',
    'no-console': 'error',
    'eol-last': 'error',
    'lines-between-class-members': [
      'error',
      'always'
    ],
    'arrow-parens': [
      'error',
      'always'
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'react/forbid-prop-types': [
      'error',
      {
        forbid: [
          'array',
          'object'
        ]
      }
    ],
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'require',
        singleline: 'consistent'
      }
    ],
    'react/jsx-tag-spacing': [
      'error',
      { beforeSelfClosing: 'always' }
    ],
    'react/no-unused-prop-types': 'error',
    indent: [
      'error',
      2,
      { SwitchCase: 1 }
    ],
    'no-trailing-spaces': 'error',
    'keyword-spacing': 'error',
    'spaced-comment': [
      'error',
      'always'
    ],
    'vars-on-top': 'error',
    'no-undef': 'error',
    'comma-dangle': [
      'error',
      'never'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ],
    'no-multiple-empty-lines': 'error',
    'guard-for-in': 'error',
    'no-nested-ternary': 'error',
    'no-eval': 'error',
    'no-with': 'error',
    'valid-typeof': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    'no-continue': 'error',
    'no-extra-semi': 'error',
    'no-unreachable': 'error',
    'no-unused-expressions': 'error',
    'indent-class-properties/indent': [
      'error',
      2
    ],
    'function-call-argument-newline': ['error', 'consistent']

  },
  globals: {
    FEATURES: 'readonly'
  }
}
