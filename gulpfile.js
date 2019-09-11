'use strict';
/*COMMON PLAGINS*/
let gulp = require('gulp'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    plumber=require('gulp-plumber'),
    del = require("del"),
    server = require('browser-sync').create(),

    /*HTML PLUGINS*/
    posthtml=require('gulp-posthtml'),

    /*CSS PLUGINS*/
    sass= require('gulp-sass'),
    postcss= require('gulp-postcss'),
    minify = require('gulp-csso'),
    autoprefixer = require('autoprefixer'),

    /*IMG-OPT PLUGINS*/
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imgCompress = require('imagemin-jpeg-recompress'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite = require('gulp-svg-sprite'),
    svgstore = require('gulp-svgstore'),
    webp=require('gulp-webp'),
    include=require('posthtml-include'),

    //JS PLUGINS
    uglify  = require('gulp-uglify-es').default,
    babel = require('gulp-babel');

//HTML************************************************************************************
gulp.task('html', function () {
    return gulp.src('dev/*.html')
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest('build'))
        // .pipe(server.reload());
});
//CSS************************************************************************************
gulp.task('css-min', function () {
    return gulp.src('dev/sass/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('build/css'))
        .pipe(minify())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(server.stream());
});

//IMAGE-OPT***************************************************************************
gulp.task('img-min', function() {
    return gulp.src('dev/resources/img/img-orig/**/*.*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imgCompress({
                loops: 5,
                min: 67,
                max: 73,
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

//SPRITE SVG**********************************************************************************
gulp.task('sprite-svg', function () {
    return gulp.src('dev/resources/img/for-sprite/*.svg')
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/resources/img/sprite'));
});

//SPRITE PNG*******************************************************************************
//  spritesmith = require('gulp.spritesmith');
gulp.task('sprite-png', function () {
    return gulp.src('dev/resources/img/img-opt/*.*')
        .pipe(spritesmith(
            {
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }
        ))
        .pipe(gulp.dest('dev/resources/img/sprite'))
});

//WEBP***********************************************************************************
gulp.task('webp', function () {
    return gulp.src('dev/resources/img/img-opt/*.{png, jpg}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('dev/resources/img/webp'));
});
//COPY***********************************************************************************
gulp.task('copy', function(){
    return gulp.src([
        "dev/resources/fonts/**/*.{woff,woff2}",
        "dev/resources/img/img-opt/**",
        "dev/js/**"
    ], {
        base: 'dev'
    })
        .pipe(gulp.dest('build'));
});

//CLEAN****************************************************************************************
gulp.task("clean", function () {
    return del("build");
});

//SERVER*********************************************************************************
gulp.task('serve', function () {
    server.init({
        server:'build'
    });
    gulp.watch('dev/sass/**/*.{scss, sass}', gulp.series('css-min'));
    gulp.watch('dev/*.html').on('change', gulp.series('html'));
    server.watch('build/*.html').on('change', server.reload)
});

//BUILD************************************************************************************
gulp.task('build', gulp.series('clean', 'copy', 'css-min', 'sprite-svg','html'));

//START***********************************************************************************
gulp.task('start', gulp.series('build','serve'));















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

/*************************************************************************************************/
//ОТ HTMLACADEMY
/*************************************************************************************************/
