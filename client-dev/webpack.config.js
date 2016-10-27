var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/app.js',
    output: {
        filename: '../public/js/app.js',
        sourceMapFilename: '../public/js/app.map'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            }
        ]
    },
    resolve: {
        root: path.resolve('./app'),
        extenstions: ['', '.js']
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //     // new webpack.DefinePlugin({
    //     //     'process.env': {
    //     //     'NODE_ENV': JSON.stringify('production')
    //     //     }
    //     // })
    // ],
    watch: false
}