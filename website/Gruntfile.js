
module.exports = function(grunt) {

    var cssFiles = {
        "build/css/main.css": [
            "src/css/main.less",
            "src/css/timeDate.less",
            "src/css/calendar.less",
            "src/css/weather.less"
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

//        uglify: {
//            options: {
//                mangle: false,
//                compress: false,
//                beautify: true
//            },
//            build: {
//                files: {
//                    "target/js/app.js": [
//                        "src/js/app/ASB.js",
//                        "src/js/app/ASB.Constants.js",
//                        "src/js/app/controller/ASB.Controller.AJAX.js",
//                        "src/js/app/utils/ASB.Utils.js",
//                        "src/js/app/manager/ASB.Manager.Audio.js",
//                        "src/js/app/model/ASB.Model.Animals.js",
//                        "src/js/app/view/ASB.View.js",
//                        "src/js/app/view/dialog/ASB.View.Dialog.js",
//                        "src/js/app/view/dialog/ASB.View.Dialog.Answer.js",
//                        "src/js/app/view/ASB.View.GameScreen.js"
//                    ]
//                }
//            }
//        },

        copy: {
            html: {
                expand: true,
                flatten: true,
                src: ['html/*'],
                dest: 'build/',
                cwd: "src"
            }//,
//            img: {
//                expand: true,
//                src: ['img/**/*'],
//                dest: 'target/',
//                cwd: "src/"
//            },
//            audio: {
//                expand: true,
//                src: ['audio/**/*'],
//                dest: 'target/',
//                cwd: "src/"
//            },
//            js: {
//                expand: true,
//                src: ['js/libs/**/*'],
//                dest: 'target/',
//                cwd: "src/"
//            }
        },

        clean:[ "build/*"],

        watch: {
            css: {
                files: ["src/css/**/*.less"],
                tasks: ["less:dev"]

            },

            js: {
                files: ["src/js/**/*.js"],
                tasks: ["react:mainApp"]
            },
//
//            js_libs: {
//                files: ["src/js/libs/**/*.js"],
//                tasks: ["copy:js"]
//            },
//
            html: {
                files: ["src/html/*"],
                tasks: ["copy:html"]
            }
//
//            img: {
//                files: ["src/img/**/*"],
//                tasks: ["copy:img"]
//            },
//
//            audio: {
//                files: ["src/audio/**/*"],
//                tasks: ["copy:audio"]
//            }
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
//    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('default', ['clean', 'less:prod', 'react', "copy"]);

};