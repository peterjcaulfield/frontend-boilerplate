const merge = require('webpack-merge');
const paths = require('./paths');
const webpackHelpers = require('./webpackHelpers');

const baseConfig = {
    output: {
        filename: '[name].js'
    },
    devtool: 'eval-source-map',
};

module.exports = merge(
    baseConfig,
    webpackHelpers.setupCSS(paths.style),
    webpackHelpers.setupDevServer({
        host: process.env.HOST,
        port: process.env.PORT
    })
);
    


