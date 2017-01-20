var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';
const suffix = (isDev ? '' : '.min') + '.js';

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './app.js',
    output: {
        path: './bin',
        filename: 'app' + suffix,
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
        // new CleanWebpackPlugin( ['./bin/**/*'], {
        //     verbose: true
        // }),
        // new CopyWebpackPlugin([
        //     { from: './assets', to: './assets' },
        //     { from: '../libs/**/*', to: './libs' },
        //     { from: '../favicon/**/*', to: './', flatten: true },
        // ], {
        //     ignore: [ '*.psd' ]
        // }),
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
else {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                unsafe: true
            },
            lint: false
        })
    );
}
