module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                presets: ['react', 'es2015']
            },
            dist: {
                files: {
                    'dist/scripts/app.js': 'site/scripts/app.js'
                }
            }
        },

        watch: {
            react: {
                files: 'site/scripts/*.js',
                tasks: ['babel']
            }
        },

        'http-server': {
            dev: {
                root: 'dist',
                port: 9000,
                runInBackground: false
            }
        }
    });

    grunt.registerTask('default', ['babel', 'http-server']);
};
