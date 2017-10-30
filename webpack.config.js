const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')

const extractSass = new ExtractTextPlugin({
  filename: "css/styles.min.css",
});

module.exports = {
  entry: './app/js/app.js',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: "source-map", // any "source-map"-like devtool is possible
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
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: ['popper.js', 'default']
    }),
    extractSass
  ]
};
