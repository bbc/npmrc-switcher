#! /usr/bin/env node
'use strict';

var findup = require("findup-sync");
var fs     = require("fs");
var shell  = require("child_process").execFile;

// Only check the value once
var baseDirectory = (function() {
    return process.env.HOME;
}());

var baseFile   = baseDirectory + '/.npmrc';
var baseBackup = baseDirectory + '/.npmrc.bak';
var nearestPath;

function isAlreadyInUse(path) {
    if (path && path !== baseFile) {
        return true;
    }
}

function getPath() {
    var npmrcPath = findup('.npmrc');

    if (isAlreadyInUse(npmrcPath)) {
        return npmrcPath;
    }

    return null;
}

function renameFile(currentFileName, newFileName) {
    if (fs.existsSync(currentFileName)) {
        fs.renameSync(currentFileName, newFileName);

        if (fs.existsSync(currentFileName)) {
            throw new Error("Couldn't rename file");
        }
    }
}

function copySourceToDestination(source, destination) {
    shell('/bin/cp', [source, destination]);
}

function returnToDefault() {
    renameFile(baseBackup, baseFile);
}

function backupCurrent() {
    renameFile(baseFile, baseBackup);
}

nearestPath = getPath();
if (nearestPath) {
    backupCurrent();
    copySourceToDestination(nearestPath, baseFile);
} else {
    returnToDefault();
}
