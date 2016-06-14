const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './routes',
  externals: [
    (context, request, callback) => {
      callback(null, !/^((|.|..|shared)\/|!|-!)/.test(request));
    },
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        loaders: [
          'css/locals?modules&importLoaders=1&localIdentName=[local]-[hash:base64]',
          'postcss',
          'sass',
          'sass-resources',
        ],
      },
    ],
  },
  output: {
    filename: 'routes.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'lib'),
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.APP_URL': JSON.stringify(process.env.APP_URL) }),
  ],
  postcss: () => [
    require('postcss-nested'),
  ],
  sassResources: './styles/bootstrap/sass-resources.scss',
  resolve: {
    alias: {
      'shared/actions': 'actions',
      'shared/components': 'components',
      'shared/mutations': 'mutations',
      'shared/styles': 'styles',
      'shared/utils': 'utils',
    },
    modulesDirectories: ['shared', 'node_modules'],
  },
  target: 'node',
};
