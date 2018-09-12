"use strict";

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gulpJshint = require('gulp-jshint');
const dartSass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const webserver = require('gulp-connect');
const del = require('del');

/**
 * Define the pathes
 */
const paths = {
    styles: {
        allScss: 'assets/scss/**/*.scss',
        src: 'assets/scss/styles.scss',
        dest: 'dist/css/'        
    },
    scripts: {
        allJs: 'assets/js/**/*.js',
        src: 'assets/js/scripts.js',
        dest: 'dist/js/'     
    },
    htlm: {
        root: 'index.html'
    },
    lib: {
        jquery: 'node_modules/jquery/dist/jquery.js'
    }
};


/**
 * Del
 * 
 * Clean the distribution files
 * 
 * https://www.npmjs.com/package/del
 */
function clean() {
    return del([
        'dist/js/bundle.js',
        'dist/css/styles.css'
    ]);
}

/**
 * Browserify, Vinyl Source Stream, Vinyl Buffer, Gulp Uglify, Gulp Sourcemaps
 * 
 * Make a bundle.js file, minify this js file and place to distribution folder
 *  
 * https://www.npmjs.com/package/browserify
 * https://www.npmjs.com/package/vinyl-source-stream
 * https://www.npmjs.com/package/vinyl-buffer
 * https://www.npmjs.com/package/gulp-uglify
 * https://www.npmjs.com/package/gulp-sourcemaps
 * 
 */
function bundleJs(cb) {
    return browserify({
        entries: [    
            paths.scripts.src                    
        ],
        debug: true
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())    
    .on('error', function(err) {
        cb(new Error(err.message));
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(webserver.reload());
}

/**
 * Gulp jshint
 * 
 * bundle.js code analysis
 * 
 * https://www.npmjs.com/package/jshint
 * 
 */
function analysisJs() {
    return gulp.src(paths.scripts.dest + 'bundle.js')
        .pipe(gulpJshint('.jshintrc'))
        .pipe(gulpJshint.reporter('jshint-stylish'));
}

/**
 * Gulp Ruby Sass
 * 
 * Compile Sass to CSS using dart-sass
 * 
 * https://www.npmjs.com/package/gulp-ruby-sass
 * https://github.com/sass/dart-sass
 */
function bundleCss(cb) {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(dartSass().on('error', function(err) {
            cb(new Error(err.message));
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(webserver.reload()); 
}

function htmlLoad() {
    return gulp.src(paths.htlm.root)
        .pipe(webserver.reload());
}

/**
 * Gulp Watch 
 * Monitor files and excute tasks
 * https://github.com/gulpjs/gulp/blob/master/docs/getting-started/8-watching-files.md
 */
function watch() {
    // gulp.watch(paths.scripts.allJs, gulp.series(bundleJs, analysisJs));
    gulp.watch(paths.scripts.allJs, bundleJs);
    gulp.watch(paths.styles.allScss, bundleCss);
    gulp.watch(paths.htlm.root, htmlLoad);
}

/**
 * Gulp Connect
 * Run a webserver 
 * https://www.npmjs.com/package/gulp-connect
 */
function webServer() {
    webserver.server({ 
        root: '.',       
        livereload: true
    });
}

/**
 * Create build series task
 */
// var build = gulp.series(clean, gulp.parallel(gulp.series(bundleJs, analysisJs), bundleCss));
var build = gulp.series(clean, gulp.parallel(bundleJs, bundleCss));
exports.build = build;
exports.cls = clean;

/**
 * Create default task
 */
exports.default = gulp.series(build, gulp.parallel(webServer, watch));