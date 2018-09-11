var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-connect');

gulp.task('js', function() {
    var b = browserify({
        entries: [
            'node_modules/jquery/dist/jquery.js',
            'assets/js/scripts.js'
        ]

    });
    return b.bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .on('error', function(err) {
                console.error('Error!', err.message);
            })
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dist/js/'));
    
});

gulp.task('jshint', ['js'], function() {
    return gulp.src('dist/js/bundle.js')
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
    return sass('assets/sass/styles.scss', {
        sourcemap: true,
        style: 'expanded'
    })
    .on('error', function(err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('watch', function() {
    gulp.watch('assets/js/**/*.js', ['js', 'jshint']);
    gulp.watch('assets/sass/**/*.scss', ['scss']);
});

gulp.task('webserver', function() {
    webserver.server({
        root: '/',
        livereload: true
    });
});

gulp.task('default', ['watch', 'sass', 'webserver']);