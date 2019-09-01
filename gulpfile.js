'use strict';
let gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imgCompress = require('imagemin-jpeg-recompress'),
    cache = require('gulp-cache'),
    spritesmith = require('gulp.spritesmith'),
    sass= require('gulp-sass'),
    minimize = require('gulp-clean-css'),
    prefixer = require('gulp-autoprefixer'),
    uglify  = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    rename = require('gulp-rename');

//IMAGE-OPT
gulp.task('img-min', function() {
    return gulp.src('dev/resources/img/img-orig/**/*.*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imgCompress({
                loops: 5,
                min: 70,
                max: 80,
                quality:'medium'
            }),
            imagemin.svgo(),
            imagemin.optipng({optimizationLevel: 3}),
            pngquant({quality: [0.6, 0.7], speed: 5})
        ],{
            verbose: true
        })))
        .pipe(gulp.dest('dev/resources/img/img-opt'))
});
gulp.task('clear-cache', function (done) {
    return cache.clearAll(done);
});
//SPRITE
//  spritesmith = require('gulp.spritesmith');
gulp.task('sprite', function () {
    return gulp.src('dev/resources/img/img-opt/*.*')
        .pipe(spritesmith(
            {
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }
        ))
        .pipe(gulp.dest('dev/resources/img/sprite'))
});
//CSS
gulp.task('css-min', function () {
    return gulp.src('dev/sass/index.css')
        .pipe(prefixer())
        .pipe(minimize())
        .pipe(rename('min.css'))
        .pipe(gulp.dest('dev'));
});
//JS
gulp.task('js-min', function () {
    return gulp.src('dev/js/main.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename('min.js'))
        .pipe(gulp.dest('dev'))
});
//BUILD
// gulp.task('copy-html', function () {
//     return gulp.src('dev/index.html')
//         .pipe(gulp.dest('pub'))
// });
// gulp.task('copy-css', function () {
//     return gulp.src('dev/main-min.css')
//         .pipe(gulp.dest('pub'))
// });
// gulp.task('copy-js', function () {
//     return gulp.src('dev/min.js')
//         .pipe(gulp.dest('pub'))
// });
// gulp.task('copy-fonts', function () {
//     return gulp.src('dev/resources/fonts/**/*.*')
//         .pipe(gulp.dest('pub/resources/fonts'))
// });
// gulp.task('copy-pictures', function () {
//     return gulp.src('dev/resources/img/pictures/**/*.*')
//         .pipe(gulp.dest('pub/resources/img/pictures'))
// });
// gulp.task('copy-sprite', function () {
//     return gulp.src('dev/resources/img/sprite/**/*.*')
//         .pipe(gulp.dest('pub/resources/img/sprite'))
// });
// gulp.task('build', function () {
//     return gulp.series()
// })