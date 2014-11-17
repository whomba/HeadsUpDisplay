
module.exports = function(grunt) {

    var cssFiles = {
            "build/css/main.css": [
                "src/css/reset.css",
                "src/css/main.less",
                "src/css/timeDate.less",
                "src/css/calendar.less",
                "src/css/weather.less"
            ]
        },
        jsFiles={
            "build/js/utils.js":[
                "src/js/utils/timeUtils.js"
            ]
        };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            options: {
                paths: ["css"],
                yuicompress: false
            },
            prod: {
                options: {
                    yuicompress: true
                },
                files: cssFiles
            },
            dev: {
                files: cssFiles
            }
        },

        uglify: {
            options: {
                mangle: false,
                compress: false,
                beautify: true
            },
            build: {
                files: jsFiles
            }
        },

        copy: {
            html: {
                expand: true,
                flatten: true,
                src: ['html/*'],
                dest: 'build/',
                cwd: "src"
            }
        },

        clean:[ "build/*"],

        watch: {
            css: {
                files: ["src/css/**/*.less"],
                tasks: ["less:dev"]

            },
            js: {
                files: ["src/js/**/*.js"],
                tasks: ["react:mainApp", "uglify:build"]
            },
            html: {
                files: ["src/html/*"],
                tasks: ["copy:html"]
            }
        },

        react: {
            mainApp: {
                files: {
                    'build/js/app.js': [
                        "src/js/weather/weather.js",
                        "src/js/calendar/calendar.js",
                        "src/js/timeDate/timeDate.js"
                    ]
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('default', ['clean', 'less:prod', 'react', 'uglify:build', "copy"]);

};