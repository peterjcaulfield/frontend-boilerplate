const merge = require('webpack-merge');
const paths = require('./paths');
const webpackHelpers = require('./webpackHelpers');

const baseConfig = {
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
    },
    devtool: 'source-map'
};

module.exports = merge(
    baseConfig,
    webpackHelpers.extractCSS(paths.style),
    webpackHelpers.clean(paths.build),
    webpackHelpers.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
    ),
    webpackHelpers.extractBundle({
        name: 'vendor',
        entries: ['react']
    }),
    webpackHelpers.minify()
);
