module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

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
                    src: ['*.js'],
                    dest: 'dist/scripts/'
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
                files: 'site/**',
                tasks: ['compile']
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
