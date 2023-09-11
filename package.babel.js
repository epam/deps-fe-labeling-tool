const defaultConfig = require('./.babelrc')

module.exports = {
  ...defaultConfig,
  ignore: ['./src/**/*.test.jsx', './src/**/*.test.js', './src/**/*.snap', './src/**/mocks/*'],
  plugins: [
    ...defaultConfig.plugins,
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '@': '../lib'
        }
      }
    ]
  ]
}
