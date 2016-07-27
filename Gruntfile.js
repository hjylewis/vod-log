module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                presets: ['react', 'es2015']
            },
            dist: {
                files: {
                    'dist/app.js': 'site/app.js'
                }
            }
        },

        watch: {
            react: {
                files: 'site/*.js',
                tasks: ['babel']
            }
        }
    });

    grunt.registerTask('default', ['babel']);
};
