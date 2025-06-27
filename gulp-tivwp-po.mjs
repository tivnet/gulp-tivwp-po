/**
 * gulp-tivwp-po.mjs
 * Run msgmerge and msgfmt on all .po files in a folder.
 * @link https://github.com/tivnet/gulp-tivwp-po
 * @author Gregory Karpinsky
 * @copyright (c) 2025 TIV.NET INC. - All Rights Reserved.
 */

import { execSync } from 'child_process';
import through from 'through2';
import PluginError from 'plugin-error';
import log from 'fancy-log';

export default function(opt) {
    const PLUGIN_NAME = "gulp-tivwp-po";

    opt = opt || {};
    if (!opt.potFile) {
        throw new PluginError(PLUGIN_NAME, "Missing potFile option.");
    }

    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {
        const potFile = opt.potFile;
        const poFile = file.path;
        const poFileName = file.relative;
        const moFile = poFile.replace(/\.po$/, ".mo");
        const moFileName = poFileName.replace(/\.po$/, ".mo");

        log.info("Making PO: " + poFileName);
        try {
            execSync("msgmerge -q -v --force-po --no-location --update --backup=none --no-fuzzy-matching " + poFile + " " + potFile);
        } catch (err) {
            console.error(err);
            return cb(err);
        }

        log.info("Making MO: " + moFileName);
        try {
            execSync("msgfmt -v -o " + moFile + " " + poFile);
        } catch (err) {
            console.error(err);
            return cb(err);
        }

        this.push(file);
        cb();
    });
};
