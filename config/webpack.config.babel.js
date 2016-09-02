const path = require('path');
const paths = require('./paths');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackHelpers = require('./webpackHelpers');

const common = {
    entry: {
        app: paths.js,
        style: paths.style
    },
    output: {
        path: paths.build
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    // Point ESLint to our predefined config.
    eslint: {
        configFile: path.join(__dirname, 'eslint.js'),
        useEslintrc: false
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint-loader'],
                include: paths.js
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: paths.js,
                query: require('./babel')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
            template: require('html-webpack-template'),
            inject: false
        })
    ]
};

let config;

const TARGET = process.env.npm_lifecycle_event;

// set babel env so we can enable hot reloading in react
// note we still need to patch the redux store
// https://github.com/survivejs-demos/redux-demo/blob/e84d05d63fdba9eb67c3c391db5c48e71a4c9c6e/kanban_app/app/store/configureStore.dev.js#L20
process.env.BABEL_ENV = TARGET;

if (TARGET === 'build') {
    const prodConfig = require('./webpack.config.prod.js');
    config = merge(
        common,
        prodConfig
    );
}

if (TARGET === 'start') {
    const devConfig = require('./webpack.config.dev.js');
    config = merge(
        common,
        devConfig
    );
}

module.exports = validate(config, { 
    quiet: true
});
