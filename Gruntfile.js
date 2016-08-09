module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('node_modules/edition-node-grunt');


    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['react', 'es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'site/scripts/',
                    src: ['*.jsx'],
                    dest: 'dist/scripts/',
                    ext: '.js'
                }]
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
            },
            sass: {
                files: 'site/style/*.scss',
                tasks: ['sass']
            },
            html: {
                files: 'site/*.html',
                tasks: ['copy']
            }
        },

        'http-server': {
            dev: {
                root: 'dist',
                port: 9000,
                runInBackground: true
            }
        },

        webpack: {
            production: {
                // TODO
            }
        }
    });

    grunt.registerTask('compile', ['babel', 'sass', 'copy']);
    grunt.registerTask('default', ['compile', 'http-server', 'watch']);
};
