const baseConfig = require('./.babelrc.js')

module.exports = {
  ...baseConfig,
  presets: [
    ...baseConfig.presets,
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
}
