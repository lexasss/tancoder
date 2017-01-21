var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

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
            { test: /\.pug$/, loader: 'pug-html-loader' },
            { test: /\.less$/, exclude: /node_modules/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
            { test: /\.(png|jpg)$/, loader: 'file-loader?name=img/[name].[ext]' }
        ]
    },

    plugins: [
        new CleanWebpackPlugin( ['./bin/**/*'], {
            verbose: false
        }),
        new CopyWebpackPlugin([
            { from: './assets', to: './assets' },
            { from: '../libs/**/*', to: './libs' },
            { from: '../favicon/**/*', to: './', flatten: true },
        ], {
            ignore: [ '*.psd' ],
            copyUnmodified: false
        }),
        new HtmlWebpackPlugin({
            template: './index.pug'
        }),
        new webpack.NoErrorsPlugin()
    ]
};

if (isDev) {
    module.exports.module.loaders.push({
        test: /\.js$/, loader: 'jshint-loader', exclude: /node_modules/
    });
    module.exports.jshint = {
        esversion: 6,
        strict: 'global',
        browser: true
    };
}
