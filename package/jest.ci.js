const baseConfig = require('./jest.config')

module.exports = {
  ...baseConfig,
  verbose: false,
  coverageReporters: ['clover', 'json', 'lcov', 'text-summary'],
  coveragePathIgnorePatterns: ['.eslintrc.js'],
  reporters: [
    ['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }]
  ]
}
