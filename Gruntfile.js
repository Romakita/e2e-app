// Generated on 2015-11-23 using generator-angular-typescript 0.11.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'


module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        ts: {
            app: {
                // specifying tsconfig as a boolean will use the 'tsconfig.json' in same folder as Gruntfile.js
                tsconfig: "tsconfig.json"
            },
            webapp: {
                // specifying tsconfig as a boolean will use the 'tsconfig.json' in same folder as Gruntfile.js
                tsconfig: "browser/tsconfig.json"
            }
        }
    });
};