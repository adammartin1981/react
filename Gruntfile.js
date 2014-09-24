module.exports = function(grunt) {
    // Do grunt-related things in here

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');


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
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};