#! /usr/bin/env node
'use strict';

var findup = require('findup-sync');
var fs     = require('fs');
var shell  = require('child_process').execFile;

// Only check the value once
var baseDirectory = process.env.HOME;

var baseFile   = baseDirectory + '/.npmrc';
var defaultFile = baseDirectory + '/.npmrc.default';
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
            throw new Error('Could not rename file');
        }
    }
}

function copySourceToDestination(source, destination) {
    shell('/bin/cp', [source, destination]);
}

function defaultExists() {
    return fs.existsSync(defaultFile);
}

function returnToDefaultFile() {
    if (fs.existsSync(baseFile)) {
        fs.unlinkSync(baseFile);
    }

    if (defaultExists) {
        copySourceToDestination(defaultFile, baseFile);
    }
}

nearestFile = getPath();
if (nearestFile) {
    copySourceToDestination(nearestFile, baseFile);
} else {
    returnToDefaultFile();
}
