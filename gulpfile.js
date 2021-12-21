const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const useref = require('gulp-useref');
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin');
const jsonminify = require('gulp-jsonminify');
const { server, reload } = require('gulp-connect');

gulp.task('watch', function () {
  gulp.watch('**/*.ts', gulp.series('browserify'));
  gulp.watch('*.html', gulp.series('html'));
  gulp.watch('*.css', gulp.series('css'));
});

gulp.task('html', function () {
  return gulp
    .src('*.html')
    .pipe(useref())
    .pipe(rename('index.html'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(reload());
});

gulp.task('json', function () {
  return gulp.src(['*.json'])
    .pipe(jsonminify())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp
    .src('*.css')
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload());
});

gulp.task('images', function () {
  return gulp
    .src('assets/*.png')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('serve', () => {
  server({
    name: 'api',
    root: './dist',
    port: 5000,
    livereload: true,
  });
});

gulp.task('browserify', function () {
  return browserify({
    entries: 'src/app.ts',
  })
    .plugin('tsify')
    .bundle()
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(reload());
});

gulp.task(
  'default',
  gulp.series(['browserify', 'images', /* 'json', */ 'html', 'css', gulp.parallel('serve', 'watch')]),
);