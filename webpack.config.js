const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),
  // entry: entry,
  entry: {
    'vendor': ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server'],
    'main': ['./entries/index.js', './entries/script.js', './entries/test.js']
  },
  output: {
    filename: 'scripts/[name].[hash].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[id].[hash].js',
    library: '[name]'
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader?importLoaders=1!postcss-loader'
        })
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: false,
            removeComments: true,
            collapseWhitespace: false
          }
        }],
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new DashboardPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/[name].bundle.css',
      allChunks: true
    }),
    new CleanWebpackPlugin(['dist', 'build'], {
      verbose: true,
      dry: false,
      exclude: ['index.html']
    }),
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      chunks: [
        'vendor',
        'common',
        'main'
      ],
      chunksSortMode: function(){
        return 1;
      },
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};