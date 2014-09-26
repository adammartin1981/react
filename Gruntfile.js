module.exports = function(grunt) {
    // Do grunt-related things in here

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var build = grunt.file.readJSON('build/build.json');

    /**
     *  To Do List
     *
     *  - Create a clean task to start afresh each time
     *  - Set up watch to properly work on modifying CSS, JS files etc
     *  - Use flags for dist/dev to prevent uglify (faster)
     *  - Make the JSX templates external
     *  - Re-use JSX Templates
     *  - Modify the HTML to include the templates
     */

    // Project configuration.
    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        // Tidy up the JS file
        uglify: {
            options: {
                banner: '/*! This is the banner to display at the top <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'demo/vendor.js',
                dest: 'demo/vendor.js'
            }
        },

        // Grunt express - our webserver
        // https://github.com/blai/grunt-express
        express: {
            all: {
                options: {
                    bases: ['./demo'],
                    port: 8088,
                    hostname: "localhost",
                    livereload: true
                }
            }
        },

        // grunt-watch will monitor the projects files
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            all: {
                files: 'src/**/*.html',
                tasks: [
                    "copy:html"
                ],
                options: {
                    livereload: true
                }
            }
        },

        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        open: {
            all: {
                path: 'http://localhost:8088/index.html'
            }
        },

        // Combines the files together
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';\n'
            },
            dist: {
                // the files to concatenate
                src: build.scripts.vendor,
                // the location of the resulting JS file
                dest: 'dist/vendor.js'
            },

            css : {
                src : build.styles.vendor,
                dest : 'dist/vendor.css'
            }


        },


        copy: {
            js: {
                expand:true,
                src: 'dist/**/*.js',
                dest: 'demo/',
                flatten:true
            },

            css: {
                expand:true,
                src: 'dist/**/*.css',
                dest: 'demo/',
                flatten:true
            },

            html: {
                expand:true,
                // To do - make this into rule/from build.json
                src: 'src/pages/index.html',
                dest: 'demo/',
                flatten:true
            },

        },

    });

    // Default task(s).
    grunt.registerTask('default', [
        'concat:dist',
        'uglify'
    ]);


    grunt.registerTask('combine', [
        'concat:dist',
        'concat:css',
        'copy:js',
        'copy:css',
        'copy:html'
    ]);

    grunt.registerTask('server', [
        'combine',
        'express',
        'uglify',
        'open',
        'watch'
    ]);

};