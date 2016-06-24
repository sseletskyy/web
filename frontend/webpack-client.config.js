const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const development = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: [
      'babel-polyfill',
      './app',
    ].concat(development ? ['webpack-hot-middleware/client'] : []),
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
    ],
  },
  output: {
    filename: development ? '[name].js' : '[name].[chunkhash].js',
    path: path.join(__dirname, 'assets'),
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.APP_URL': JSON.stringify(process.env.APP_URL) }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ].concat(development ? [
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.optimize.UglifyJsPlugin(),
    function writeAssetList() {
      this.plugin('done', stats => {
        fs.writeFileSync(
          path.join(__dirname, 'assets.json'),
          JSON.stringify(stats.toJson().assetsByChunkName, null, '  ')
        );
      });
    },
  ]),
  resolve: {
    alias: {
      'shared/actions': 'actions',
      'shared/components': 'components',
      'shared/mutations': 'mutations',
      'shared/utils': 'utils',
    },
    modulesDirectories: ['shared', 'node_modules'],
  },
};
