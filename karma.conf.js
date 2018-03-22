var webpackConfig = require('./webpack.config.js');

var config = function (config) {
    return config.set({
        basePath: '',
        browsers: [
            'Chrome',
        ],
        frameworks: [
            'jasmine'
        ],
        files: [
            'enzyme.webpack.js'
        ],
        preprocessors: {
            'enzyme.webpack.js': ['webpack', 'sourcemap'],
        },
        webpack: Object.assign(
            {},
            webpackConfig,
            {
                externals: {
                    'react/addons': true,
                    'react/lib/ExecutionEnvironment': true,
                    'react/lib/ReactContext': true,
                },
            }
        ),
        webpackServer: {
            noInfo: true,
        },
        reporters: [
            'kjhtml',
            'spec'
        ],
        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        },
        colors: true,
        autoWatch: true,
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-phantomjs-launcher',
            'karma-jasmine-html-reporter',
            'karma-chrome-launcher',
            'karma-spec-reporter'
        ],
    });
};

module.exports = config;
