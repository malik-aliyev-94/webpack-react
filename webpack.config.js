const { resolve } = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const autoprefixer = require('autoprefixer')({
        browsers: ['last 30 versions'],
    });

const entriesObj = {
  hmr: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ],
  files: glob.sync("./src/entries/*.js")
};

const entry = entriesObj['hmr'].concat(entriesObj['files']);
entry.map(function(path, index){
    entry[index] = path.replace(/\.\/src/, ".")
});

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: entry,
  output: {
    filename: 'bundle.js',
    // the output bundle
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
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
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new DashboardPlugin(),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
  ],
};