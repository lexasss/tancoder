var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './app.js',
    output: {
        path: './bin',
        filename: 'app.js',
        library: 'Tancoder'
    },

    module: {
        loaders: [
            { test: /\.jade$/, loader: 'pug-html-loader' },
            { test: /\.less$/, exclude: /node_modules/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
            { test: /\.(png|jpg)$/, loader: 'file-loader?name=img/[name].[ext]' }
        ]
    },

    plugins: [
        new CleanWebpackPlugin( ['./bin/**/*'], {
            verbose: true
        }),
        new CopyWebpackPlugin([
            { from: './assets', to: './assets' },
            { from: '../libs/**/*', to: './libs' },
            { from: '../favicon/**/*', to: './', flatten: true },
        ], {
            ignore: [ '*.psd' ]
        }),
        new HtmlWebpackPlugin({
            template: './index.jade'
        }),
        new webpack.NoErrorsPlugin()
    ]
};