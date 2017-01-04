'use strict';

var gulp = require("gulp");
var clean = require("gulp-clean");
var gutil = require("gulp-util");
var webpack = require("webpack")
var WebpackDevServer = require("webpack-dev-server");
var webpackLocalConfig = require("./webpack.config");
var webpackDevConfig = require("./webpack.dev.config");
var webpackProdConfig = require("./webpack.prod.config");
var webpackServerConfig = require("./webpack.server.config");
var appConfig = require("./conf/config");

gulp.task("clean", function(){
    return gulp.src('dist/app/', {read: false})
        .pipe(clean());
});

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

gulp.task("webpack-dev-server", function(callback){
    // modify some webpack config options
    var config = Object.create(webpackLocalConfig);
    config.output.publicPath = appConfig.SITE_URL;
    config.devtool = "eval";
    config.debug = true;
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(config), {
        hot: true,
        noInfo: false,
        inline: true,
        historyApiFallback: true,
        stats: {
            colors: true
        }
    }).listen(8888, "localhost", function(err){
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function() {
    gulp.watch(["src/**/*"], ["webpack:build-dev"]);
});

gulp.task("webpack:build-dev", ["clean"], function(callback) {
    // modify some webpack config options
    var config = Object.create(webpackDevConfig);
    config.output.publicPath = appConfig.SITE_URL+'client-app/dist/app/';
    config.devtool = "sourcemap";
    config.debug = true;
    // create a single instance of the compiler to allow caching
    var devCompiler = webpack(config);
    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//Build server js
gulp.task("server-clean", function(){
    return gulp.src('dist/server/', {read: false})
        .pipe(clean());
});
gulp.task("webpack:build-server", ["server-clean"], function(callback) {
    // modify some webpack config options
    var config = Object.create(webpackServerConfig);
    config.devtool = "cheap-module-source-map";
    // create a single instance of the compiler to allow caching
    var serverCompiler = webpack(config);
    // run webpack
    serverCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-server", err);
        gutil.log("[webpack:build-server]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("build-dev-server", ["webpack:build-server", "webpack:build-dev"], function() {
    gulp.watch(["src/**/*"], ["webpack:build-server", "webpack:build-dev"]);
});

//Build production
gulp.task("webpack:build-prod", ["clean"], function(callback) {
    // modify some webpack config options
    var config = Object.create(webpackProdConfig);
    config.output.publicPath = appConfig.SITE_URL+"client-app/dist/app/";
    // create a single instance of the compiler to allow caching
    var prodCompiler = webpack(webpackProdConfig);
    // run webpack
    prodCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-prod", err);
        gutil.log("[webpack:build-prod]", stats.toString({
            colors: true
        }));
        callback();
    });
});
gulp.task("build-prod", ["webpack:build-server", "webpack:build-prod"]);