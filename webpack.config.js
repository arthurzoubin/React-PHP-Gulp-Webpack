'use strict';

var path = require("path");
var webpack = require("webpack");
var loaders = require("./webpack.loaders");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:8888",
        "webpack/hot/dev-server",
        path.resolve(__dirname, "./index.js")
    ],
    output: {
        path: path.resolve(__dirname, "./dist/app"),
        filename: "assets/js/app.js"
    },
    module: {
        loaders
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
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
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}