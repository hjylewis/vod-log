module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['react', 'es2015']
            },
            dist: {
                files: {
                    'dist/scripts/app.js': 'site/scripts/app.js'
                }
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'site/style',
                    src: ['*.scss'],
                    dest: 'dist/style',
                    ext: '.css'
                }]
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'site',
                src: '*.html',
                dest: 'dist/',
            },
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

    grunt.registerTask('compile', ['babel', 'sass', 'copy']);
    grunt.registerTask('default', ['compile', 'http-server']);
};
