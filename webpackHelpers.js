const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.setupProdFileOutput = () => {
    return {
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[chunkhash].js'
        }
    };
};

exports.setupDevFileOutput = () => {
    return {
        output: {
            filename: '[name].js'
        }
    };
};

exports.setupJavascript = path => {
    return {
        module: {
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['eslint-loader'],
                    include: path
                }
            ],
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['babel?cacheDirectory'],
                    include: path
                }
            ]
        } 
    };
};

exports.setupSourceMaps = target => {
    const sourceMapConfig = {};
    sourceMapConfig.devtool = target === ' build' ? 'source-map' : 'eval-source-map';
    return sourceMapConfig;
};

exports.setupHtmlOutput = () => {
    return {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
                template: require('html-webpack-template'),
                inject: false
            })
        ],
    };
};

exports.setupDevServer = options => {
    return {
        devServer: {

            historyApiFallback: true,

            hot: true,
            inline: true,

            stats: 'errors-only',

            host: options.host,
            port: options.port

        },
        plugins: [

            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
};

exports.setupCSS = paths => {
    return {
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'sass'],
                    include: paths
                }
            ]
        }
    };
};

exports.minify = () => {
    return { 
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
};

exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
};

exports.extractBundle = options => {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest']
            })
        ]
    };
};

exports.extractCSS = paths => {
    return {
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('style', 'css', 'sass'),
                    include: paths
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[chunkhash].css')
        ]
    };
};

exports.clean = path => {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                root: process.cwd()
            })
        ]
    };
};
