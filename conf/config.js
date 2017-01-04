'use strict';

var configFile = require("./config.json");
var minimist = require('minimist');

var DEFAULT_OPTIONS = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'production'}
};
var options = minimist(process.argv.slice(2), DEFAULT_OPTIONS);

module.exports = configFile[options.env];