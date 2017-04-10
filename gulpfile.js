/**
 * @file 用于发布之前compile
 * @author houyl@jingoal.com
 */
/* eslint-disable*/
const gulp = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const replace = require('gulp-replace');

gulp.task('clean', () =>
    gulp.src(['./lib'], {read: false})
        .pipe(clean())
)

gulp.task('babel', ['clean'], () =>
    gulp.src(['./src/**/*.jsx',
            './src/**/*.js'])
        .pipe(babel({
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['transform-runtime', 'transform-decorators-legacy']
        }))
        .pipe(replace(/.scss/g, '.css'))
        .pipe(gulp.dest('./lib'))
)

gulp.task('sass', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./lib'))
});


gulp.task('move', ['clean', 'sass'], () =>
    gulp.src([
            './src/**/*.css',
            './src/**/*.png',
            './src/**/*.eot',
            './src/**/*.svg',
            './src/**/*.ttf',
            './src/**/*.woff',
            './src/**/*.json'])
        .pipe(gulp.dest('./lib'))
)

gulp.task('default', ['babel', 'move'])
