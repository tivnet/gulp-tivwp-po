/**
 * gulp-tivwp-po.js
 * Run msgmerge and msgfmt on all .po files in a folder.
 * @author Gregory Karpinsky
 * @copyright (c) 2018 TIV.NET INC. - All Rights Reserved.
 */

"use strict";

var execSync = require("child_process").execSync;
// through2 is a thin wrapper around node transform streams
var through = require("through2");
var PluginError = require("gulp-util").PluginError;

// Consts
const PLUGIN_NAME = "gulp-tivwp-po";

// Plugin level function(dealing with files)
function tivwpPOMO(opt) {
    opt = opt || {};
    if (!opt.potFile) {
        throw new PluginError(PLUGIN_NAME, "Missing potFile option.");
    }

    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {
        var potFile = opt.potFile;
        var poFile = file.path;
        var poFileName = file.relative;
        var moFile = poFile.replace(/\.po$/, ".mo");
        var moFileName = poFileName.replace(/\.po$/, ".mo");

        console.log("Making PO: " + poFileName);
        execSync("msgmerge -v --backup=none --no-fuzzy-matching --update " + poFile + " " + potFile,
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            });

        console.log("Making MO: " + moFileName);
        execSync("msgfmt -v -o " + moFile + " " + poFile,
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            });

        this.push(file);
        cb();
    });
}

module.exports = tivwpPOMO;
