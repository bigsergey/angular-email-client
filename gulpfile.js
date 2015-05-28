var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var connect = require('gulp-connect');

var onError = function(err) {
    console.log(err);
};

gulp.task('jshint', function() {
    return gulp.src(['./app/*.js', './app/*/*.js'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
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

gulp.task('concat', function() {
    return gulp.src(['./app/*.js', './app/*/*.js'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js/'))
        .pipe(notify({
            message: 'Concat task complete!'
        }));
});

gulp.task('watch', function() {

    gulp.watch(['./app/*.js', './app/*/*.js'], ['jshint', 'concat']);

    gulp.watch(['./app/**', './assets/**', './index.html']).on('change', function() {
        connect.reload();
    });

});

gulp.task('connect', function() {
    connect.server();
});

gulp.task('default', ['connect', 'watch']);
