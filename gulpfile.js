var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var connect = require('gulp-connect');
var mainGulpBowerFiles = require('main-bower-files');
var watch = require('gulp-watch');
var url = require('url');
var proxy = require('proxy-middleware');

var onError = function(err) {
    console.log(err);
};

gulp.task('jshint', function() {
    return gulp.src(['./app/*.js','./app/**/*.js'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint('.jshintrc'))
        .pipe(notify(function(file) {

            if (file.jshint.success) {
                // Don't show something if success
                return false;
            }

            var errors = file.jshint.results.map(function(data) {
                if (data.error) {
                    return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join("\n");

            return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
        }));
});

gulp.task('bower-files', function() {
    return gulp.src(mainGulpBowerFiles())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('concat', function() {
    return gulp.src(['./app/*.js', './app/**/*.js'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('main.js'))
        .pipe(angularFilesort())
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({
            message: 'Concat task complete!'
        }));
});

gulp.task('watch', function() {

    gulp.watch(['./app/*.js', './app/**/*.js'], ['jshint', 'concat']);

    watch(['./app/**', './assets/**', './index.html']).pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        livereload: true,
        port: 8000,
        middleware: function(connect, o) {
            return [(function() {
            	var options = url.parse('http://localhost:8080/');
            	options.route = '/api'
            	return proxy(options);
            }())];
        }
    });
});

gulp.task('default', ['jshint', 'concat', 'bower-files', 'connect', 'watch']);
