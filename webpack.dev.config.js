'use strict';

var path = require("path");
var webpack = require("webpack");
var loaders = require("./webpack.loaders");
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        app: path.resolve(__dirname, "./index.js")
    },
    output: {
        path: path.resolve(__dirname, "./dist/app"),
        filename: "assets/js/[name].js"
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
                NODE_ENV: '"dev"'
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery"
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