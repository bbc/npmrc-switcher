/*global module:false*/
"use strict";
module.exports = function(grunt) {

    grunt.initConfig({
        pkg         : grunt.file.readJSON('package.json'),
        jshint      : {
            all     : [ '**/*.js', '!node_modules/**/*'],
            options : {
                jshintrc : '.jshintrc'
            }
        },
        jscs        : {
            main    : [ '**/*.js', '!node_modules/**/*'],
            options : {
                config : '.jscs.json',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs-checker");

    grunt.registerTask('default', ['jshint', 'jscs']);

};
