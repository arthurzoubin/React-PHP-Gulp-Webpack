'use strict';

var path = require("path");
var glob = require("glob");
var webpack = require("webpack");
var loaders = require("./webpack.loaders");

//Generate enter
var Entries = {};
Entries["svendor"] = ['react', 'react-dom/server'];
Entries["server"] = path.resolve(__dirname, "./src/server/server.js");
Entries = Object.assign({}, Entries, getEntry('src/server/pages/*.js', 'src/server/'));


module.exports = {
    entry: Entries,
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "server/[name].js"
    },
    module: {
        loaders
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    plugins: [
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
            name:'svendor'
        }),
        new webpack.optimize.DedupePlugin()
    ]
}

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = './' + entry;
    }
    return entries;
}