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
var nearestPath;


function getPath() {
    var npmrcPath = findup('.npmrc');

    if (npmrcPath && npmrcPath !== baseFilePath) {
        return npmrcPath;
    }

    return null;
}

function renameFile(currentFileName, newFileName) {
    if(fs.existsSync(currentFileName)) {
        fs.renameSync(currentFileName, newFileName);

        if(fs.existsSync(currentFileName)) {
            throw new Error("Couldn't rename file");
        }
    }
}

function copySourceToDestination(source, destination) {
    shell('/bin/cp', [source, destination]);
}

function returnToDefault() {
    renameFile(baseBackupPath, baseFilePath);
}

function backupCurrent() {
    renameFile(baseFilePath, baseBackupPath);
}

nearestPath = getPath();
if (nearestPath) {
    backupCurrent();
    copySourceToDestination(nearestPath, baseFilePath);
} else {
    returnToDefault();
}
