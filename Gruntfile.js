module.exports = function(grunt) {
    // Do grunt-related things in here

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! This is the banner to display at the top <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
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
                    files: '**/*.html',
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
        }

    });

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

    grunt.registerTask('server', [
        'express',
        'open',
        'watch'
    ]);

};