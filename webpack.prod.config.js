'use strict';

var path = require("path");
var webpack = require("webpack");
var loaders = require("./webpack.loaders");
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        app: path.resolve(__dirname, "./index.js")
    },
    output: {
        path: path.resolve(__dirname, "./dist/app"),
        filename: "assets/js/[chunkhash].js"
    },
    module: {
        loaders
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            cache: false
        }),
        new webpack.optimize.DedupePlugin()
    ]
}