#! /usr/bin/env node
'use strict';

var findup = require("findup-sync");
var fs     = require("fs");
var shell  = require("child_process").execFile;

function getUserHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

var npmrcUserPath = getUserHome() + '/.npmrc';
var npmrcUserBackupPath = getUserHome() + '/.npmrc.bak';

function getPath() {
    var npmrcPath = findup('.npmrc');
    if (npmrcPath) {
        if (npmrcPath !== npmrcUserPath) {
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
    renameFile(npmrcUserBackupPath, npmrcUserPath);
}

function backupCurrent() {
    renameFile(npmrcUserPath, npmrcUserBackupPath);
}

var path = getPath();
if (path) {
    backupCurrent();
    copyFile(path, npmrcUserPath, function() {
    });
} else {
    returnToDefault();
}
