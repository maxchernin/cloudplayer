var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

gulp.task('scripts', function () {
    return gulp.src(['app/**/*.js', '!app/build/**/*.js'])
        .pipe(concat('cloudplayer-v0.1.0.js'))
        .pipe(gulp.dest('build/app/javascript'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/app/javascript'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});
gulp.task('images', function () {
    return gulp.src('assets/images/**/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('build/assets/images'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});
gulp.task('clean', function (cb) {
    del(['build/assets/css', 'build/app/javascript', 'build/assets/images'], cb)
});

gulp.task('default', ['clean'], function () {
    gulp.start('scripts', 'images', 'watch');
});
gulp.task('watch', function () {
    // Watch .scss files
    //  gulp.watch('assets/styles/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch(['app/**/*.js', '!app/build/**/*.js'], ['scripts']);

    // Watch image files
    gulp.watch('assets/images/**/*', ['images']);


});