const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const webpackHelpers = require('./webpackHelpers');

const PATHS = {
    // path to src
    app: path.join(__dirname, 'app'),
    // path to styles
    style: [
        path.join(__dirname, 'app', 'main.css'),
    ],
    // path to where webpack will output the build
    build: path.join(__dirname, 'build')
};

const common = merge(
    {
        entry: { 
            app: PATHS.app,
            style: PATHS.style
        },
        output: {
            path: PATHS.build
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
    },
    webpackHelpers.setupHtmlOutput(),
    webpackHelpers.setupJavascript(PATHS.app)
);

var config;

const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'start') {
    config = merge(
        common,
        webpackHelpers.setupDevFileOutput(),
        webpackHelpers.setupSourceMaps(TARGET),
        webpackHelpers.setupCSS(PATHS.style),
        webpackHelpers.setupDevServer({
            host: process.env.HOST,
            port: process.env.PORT
        })
    );
}

if (TARGET === 'build') {
    config = merge(
        common,
        webpackHelpers.setupProdFileOutput(),
        webpackHelpers.setupSourceMaps(TARGET),
        webpackHelpers.extractCSS(PATHS.style),
        webpackHelpers.clean(PATHS.build),
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
}

module.exports = validate(config, { 
    quiet: true
});
