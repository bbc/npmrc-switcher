/*global module:false*/
"use strict";
module.exports = function(grunt) {

    grunt.initConfig({
        pkg      : grunt.file.readJSON('package.json'),
        jshint   : {
            all     : [ '**/*.js', '!node_modules/**/*'],
            options : {
                jshintrc : '.jshintrc'
            }
        },
        jscs     : {
            main    : [ '**/*.js', '!node_modules/**/*'],
            options : {
                config : '.jscs.json',
            }
        },
        nodeunit : {
            all : ['tests/**/*_test.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('default', ['jshint', 'jscs', 'nodeunit']);

};
