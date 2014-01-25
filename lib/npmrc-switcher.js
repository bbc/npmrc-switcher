#! /usr/bin/env node
'use strict';

var findup = require("findup-sync");
var fs     = require("fs");
var shell  = require("child_process").execFile;

// Only check the value once
var baseDirectory = (function(){
    return process.env.HOME;
}());

var baseFilePath   = baseDirectory + '/.npmrc';
var baseBackupPath = baseDirectory + '/.npmrc.bak';

function getPath() {
    var npmrcPath = findup('.npmrc');
    if (npmrcPath) {
        if (npmrcPath !== baseFilePath) {
            return npmrcPath;
        }
    } else {
        return null;
    }
}

function renameFile(currentFileName, newFileName) {
    if (fs.existsSync(currentFileName)) {
        fs.renameSync(currentFileName, newFileName);
        if (fs.existsSync(currentFileName)) {
            // You didn't get renamed bro...
            throw new Error("Couldn't rename file.");
        }
    }
}

function copyFile(source, target, callback) {
    shell('/bin/cp', [source, target], function() {
        callback();
    });
}

function returnToDefault() {
    renameFile(baseBackupPath, baseFilePath);
}

function backupCurrent() {
    renameFile(baseFilePath, baseBackupPath);
}

var path = getPath();
if (path) {
    backupCurrent();
    copyFile(path, baseFilePath, function() {
    });
} else {
    returnToDefault();
}
