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
    ],
  },
  output: {
    filename: 'routes.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'lib'),
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_URL': JSON.stringify(process.env.APP_URL),
      'process.env.AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
    }),
  ],
  resolve: {
    alias: {
      'shared/actions': 'actions',
      'shared/components': 'components',
      'shared/mutations': 'mutations',
      'shared/utils': 'utils',
    },
    modulesDirectories: ['shared', 'node_modules'],
  },
  target: 'node',
};
