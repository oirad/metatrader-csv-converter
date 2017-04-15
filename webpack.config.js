var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: ['react-hot-loader', 'babel-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(css|scss)$/,
      loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'sass-loader'], }),
    }]
  }
};
