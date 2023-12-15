const { override, addWebpackPlugin, addWebpackModuleRule } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { overrideProcessEnv } = require('./misc/overrideProcessEnv');
const esmRequire = require('esm')(module);
const themeVariables = esmRequire('./misc/antd-theme')
const { CompilationFeature } = esmRequire('labeling-tool/lib/enums/CompilationFeature');

const ENABLED_FEATURES_NAMES = [CompilationFeature.SHOW_NOT_IMPLEMENTED];

module.exports = override(
  addWebpackPlugin(
    new AntdDayjsWebpackPlugin({
      replaceMoment: true,
      plugins: require('./misc/dayjs-plugins'),
    }),
  ),
  overrideProcessEnv({
    FEATURES: JSON.stringify(ENABLED_FEATURES_NAMES),
  }),
  addWebpackModuleRule({
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
    issuer: /\.(js|ts)x?$/,
  }),
  // fixBabelImports('antd', { libraryName: 'antd', libraryDirectory: 'es', style: true }),
  addWebpackModuleRule({
    test: [/\.css$/, /\.less$/],
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
           {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: themeVariables,
          },
        },
      },
    ],
  }),
);
