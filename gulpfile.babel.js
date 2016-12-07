var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var babel = require ('gulp-babel');
var browserify = require ('browserify');
var source = require ('vinyl-source-stream');
const changed = require ('gulp-changed');
var b = browserify();

var fastBuild = true;

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

gulp.task('lib', () => {
  gulp.src('src/lib/lib.js')
    // .pipe(changed('src/lib', {hasChanged: changed.compareLastModifiedTime}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('appLib.js'))
    .pipe(gulp.dest('src/pkg'));
});

// Package react file
gulp.task('react', () => {
  gulp.src('src/index.js')
    .pipe(changed('src/pkg', {hasChanged: changed.compareLastModifiedTime}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('src/pkg'));
});

gulp.task ('browserify', () => {
  return browserify('./src/pkg/app.js')
  .bundle()
  //desired
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./dist'));
})
// b.add('dist/index.js');
// b.bundle();

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('src/less/freelancer.less')
        // .pipe(changed('css', {hasChanged: changed.compareLastModifiedTime}))
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('css/freelancer.css')
        // .pipe(changed('css', {hasChanged: changed.compareLastModifiedTime}))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('js/freelancer.js')
        // .pipe(changed('dist', {hasChanged: changed.compareLastModifiedTime}))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Run everything except copy because this is not the first time running the gulp file.
//Add copy if this is the first time
var l = fastBuild ? ['react', 'browserify','minify-js'] : ['lib','react', 'browserify', 'less', 'minify-css', 'minify-js']
gulp.task('default', l);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
