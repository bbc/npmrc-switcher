#! /usr/bin/env node
'use strict';

var findup = require("findup-sync");
var fs     = require("fs");
var shell  = require("child_process").execFile;

// Only check the value once
var baseDirectory = process.env.HOME;

var baseFile   = baseDirectory + '/.npmrc';
var baseBackup = baseDirectory + '/.npmrc.bak';
var nearestFile;

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

function returnToBackedUpFile() {
    renameFile(baseBackup, baseFile);
}

function backupFileCurrentlyInUse() {
    renameFile(baseFile, baseBackup);
}

nearestFile = getPath();
if (nearestFile) {
    backupFileCurrentlyInUse();
    copySourceToDestination(nearestFile, baseFile);
} else {
    returnToBackedUpFile();
}
