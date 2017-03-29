const {
  resolve
} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');


module.exports = function (env) {

  const production = env === "production";

  const config = {
    context: resolve(__dirname, 'src'),
    entry: {
      'main': ['./entries/index.js', './entries/script.js', './entries/test.js'],
      'common': ['./entries/common.js']
    },
    output: {
      filename: 'scripts/[name].[hash].js',
      path: resolve(__dirname, 'dist'),
      publicPath: './',
      chunkFilename: '[id].[hash].js',
      library: '[name]'
    },
    devtool: 'eval',
    module: {
      rules: [{
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
          use: [{
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
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin({
        filename: 'styles/[name].css',
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
        chunksSortMode: function () {
          return 1;
        },
        inject: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'scripts/common.[hash].js',
        minChunks: 2,
        children: true
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new AssetsPlugin({
        filename: 'assets.json',
        path: __dirname + '/dist',
        fullPath: false
      })
    ]
  };

  if (production) {
    // Production mode
    config['devtool'] = 'inline-source-map';
    config['plugins'].push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        env: JSON.stringify('prod')
      },
    }));
    config['plugins'].push(new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }));
    config['plugins'].push(new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }));
    config['plugins'].push(new webpack.optimize.OccurrenceOrderPlugin());
  } else {
    // Development mode
    config['entry']['vendor'] = ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server'];
    config['devServer'] = {
      hot: true,
      contentBase: resolve(__dirname, 'dist'),
      publicPath: '/'
    };
    config['plugins'].push(new webpack.HotModuleReplacementPlugin());
    config['plugins'].push(new DashboardPlugin());
    config['plugins'].push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        env: JSON.stringify('dev')
      },
    }));
    config['plugins'].push(new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }));
  }

  return config;
}