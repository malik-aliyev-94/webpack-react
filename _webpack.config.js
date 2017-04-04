const {
    resolve
} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
// const WebpackNotifierPlugin = require('webpack-notifier');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = function(env) {

    const production = env === "production";
    if (!production) env = "development";

    var cssDev = ['style-loader', 'css-loader', 'postcss-loader']
    var cssProd = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?importLoaders=1!postcss-loader',
        publicPath: '/dist'
    })
    var cssConfig = production ? cssProd : cssDev

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

        resolve: {
            extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx']
        },

        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    use: [
                        'babel-loader',
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: cssConfig
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
                },
                {
                    test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                    loader: 'file-loader?name=[path][name].[ext]'
                }
            ]
        },

        plugins: [
            new webpack.NamedModulesPlugin(),
            new ExtractTextPlugin({
                filename: 'styles/[name].css',
                allChunks: true,
                disable: !production
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
                chunksSortMode: function() {
                    return 1;
                },
                inject: true,
                // hash: true
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
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(env),
                    env: JSON.stringify(env)
                },
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: env
            }),
            // new WebpackNotifierPlugin({title: 'Webpack'}),
            new WebpackBuildNotifierPlugin({
                title: "Webpack Build",
                suppressSuccess: true,
                successSound: "Glass", //"Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink"
                failureSound: "Basso"
            })
        ],
        // stats: "none"
    };

    if (production) {
        // Production mode
        config['devtool'] = 'source-map';
        config['plugins'].push(new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
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
            publicPath: '/',
            open: true
        };
        config['plugins'].push(new webpack.HotModuleReplacementPlugin());
        config['plugins'].push(new DashboardPlugin());
    }

    return config;
}