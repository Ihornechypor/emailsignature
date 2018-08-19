const gulp = require("gulp");
const gulpInlineCss = require("gulp-inline-css");
const sass = require('gulp-sass');
const inlineCss = require('gulp-inline-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();



let config = {
  source: './src/',
  src: {
    scss: './scss/**/*.scss',
    css: './css/',
    html: './*.html',
    img: './img/*.{png,jpg,jpeg,gif,svg}'
  },
  prod: './prod/',
  dest: {
    css: './css/',
    js: './js/',
    img: './img/'
  }


}






gulp.task('scss', function(){
   gulp.src(config.source + config.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.source + config.src.css))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
   return gulp.src(config.source + config.src.html)
      .pipe(inlineCss({
             applyStyleTags: true,
             applyLinkTags: true,
             removeStyleTags: false,
             removeLinkTags: true
       }))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(config.prod))
      .pipe(browserSync.reload({stream: true}))

});
gulp.task('imagemintask', function(){
  return  gulp.src(config.source + config.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(config.prod + config.dest.img))
});

gulp.task('watch', function() {

    browserSync.init({
        server: config.prod
    });

  gulp.watch(config.source + config.src.scss, ['scss'])
  gulp.watch(config.source + config.src.html, ['html'])


});
