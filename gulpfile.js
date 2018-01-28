// loading libraries
var gulp = require('gulp'),
    merge = require('merge-stream'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    strip = require('gulp-strip-comments'),
    sass = require('gulp-sass');

var appJsPaths = './assets/js/**/*.js',
    appSassPath ='./assets/scss/base.scss',
    npmJsPaths = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ],
    npmCssPaths = [
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './assets/fonts/font-awesome/fontawesome-all.min.css'
    ],
    vendorBuildPath = './public/build/vendor',
    appBuildPath = './public/build',
    fontBuildPath = './public/build/webfonts',
    bootstrapFontPaths = [
        './assets/fonts/font-awesome/webfonts/fa-brands-400.eot',
        './assets/fonts/font-awesome/webfonts/fa-brands-400.svg',
        './assets/fonts/font-awesome/webfonts/fa-brands-400.ttf',
        './assets/fonts/font-awesome/webfonts/fa-brands-400.woff',
        './assets/fonts/font-awesome/webfonts/fa-brands-400.woff2',
        './assets/fonts/font-awesome/webfonts/fa-regular-400.eot',
        './assets/fonts/font-awesome/webfonts/fa-regular-400.svg',
        './assets/fonts/font-awesome/webfonts/fa-regular-400.ttf',
        './assets/fonts/font-awesome/webfonts/fa-regular-400.woff',
        './assets/fonts/font-awesome/webfonts/fa-regular-400.woff2',
        './assets/fonts/font-awesome/webfonts/fa-solid-900.eot',
        './assets/fonts/font-awesome/webfonts/fa-solid-900.svg',
        './assets/fonts/font-awesome/webfonts/fa-solid-900.ttf',
        './assets/fonts/font-awesome/webfonts/fa-solid-900.woff',
        './assets/fonts/font-awesome/webfonts/fa-solid-900.woff2'
    ];

gulp.task('app', function() {
    var appJsStream = gulp.src(appJsPaths).pipe(concat('main.js')).pipe(uglify({ mangle: false })).pipe(gulp.dest(appBuildPath)),
        appSassStream = gulp.src(appSassPath).pipe(sass({ outputStyle: 'compressed' })).pipe(concat('main.css')).pipe(gulp.dest(appBuildPath));

    return merge(appJsStream, appSassStream);
});

gulp.task('vendor', function() {
    var vendorJsStream = gulp.src(npmJsPaths).pipe(concat('vendor.js')).pipe(strip()).pipe(gulp.dest(vendorBuildPath)),
        vendorCssStream = gulp.src(npmCssPaths).pipe(concat('vendor.css')).pipe(gulp.dest(vendorBuildPath)),
        vendorFontStream = gulp.src(bootstrapFontPaths).pipe(gulp.dest(fontBuildPath));

    return merge(vendorJsStream, vendorCssStream, vendorFontStream);
});

gulp.task('watch', ['app'], function() {
    gulp.watch(appJsPaths, ['app']);
    gulp.watch(appSassPath, ['app']);
});
