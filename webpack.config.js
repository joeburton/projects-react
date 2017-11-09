const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')

const extractSass = new ExtractTextPlugin({
    filename: "css/styles.min.css",
});

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

module.exports = {
    entry: './app/js/app.js',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'app'),
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015']
                    }
                }]
            },
            {
                test: /\.(scss)$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true
                        } // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        } // compiles Sass to CSS
                    }]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    devtool: "source-map", // any "source-map"-like devtool is possible
    // devtool: 'inline-source-map', // don't use for production; good for debugging test specs
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: ['popper.js', 'default']
        }),
        extractSass
    ]
};
