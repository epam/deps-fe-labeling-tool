const path = require('path')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const themeVariables = require('./antd/antd-theme')

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1
    }
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        plugins: [
          'postcss-preset-env',
          'postcss-flexbugs-fixes'
        ]
      }
    }
  }
]

const paths = {
  app: '.',
  favicon: './src/assets/images/favicon.png',
  src: './src',
  dist: './dist',
  entry: './src/application/entry.jsx'
}

module.exports = {
  entry: path.resolve(__dirname, paths.entry),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, paths.dist)
  },
  resolve: {
    modules: [
      path.resolve(__dirname, paths.src),
      'node_modules'
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, paths.src),
      '~': path.resolve(__dirname, paths.app)
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.less$/,
        use: [
          ...cssLoaders,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
        issuer: /\.(js|ts)x?$/
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline'
      },
      {
        exclude: [/\.(m|e)?js(x?)$/, /\.(c|le)ss$/, /\.html$/, /\.svg$/i, /\.(woff(2)?|eot|ttf|otf|)$/],
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new AntdDayjsWebpackPlugin({
      replaceMoment: true,
      plugins: require('./antd/dayjs-plugins')
    }),
    new CssMinimizerPlugin({
      minimizerOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: paths.favicon,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
}
