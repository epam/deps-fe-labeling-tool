import { CompilationFeature } from './src/enums/CompilationFeature'
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const ENABLED_FEATURES_NAMES = [CompilationFeature.SHOW_NOT_IMPLEMENTED]

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new DefinePlugin({
      FEATURES: JSON.stringify(ENABLED_FEATURES_NAMES)
    })
  ]
})
