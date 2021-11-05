var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');
var concat = require('gulp-concat');

function css_style(done){
  gulp.src('./scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    errorLogToConsole: true,
    outputStyle: 'compressed'
  }))
  .on('error', console.error.bind(console))
  .pipe(autoprefixer({
    browers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./build/css/'))
  .pipe(browserSync.stream());

  done();
}

function scripts(done){
  return gulp.src('./js/**/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('./build/js/'))
  .pipe(browserSync.stream());
  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3000,
  })
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  gulp.watch("./scss/**/*", css_style);
  gulp.watch("*.html", browserReload);
  gulp.watch("./js/**/*", scripts);
}

gulp.task('default', gulp.parallel(sync, watchFiles, css_style, scripts));

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
