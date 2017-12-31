var gulp = require("gulp"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  path = require("path");

// Initialize BrowserSync, watch src files, and update on changes.
gulp.task("serve", ["pug", "sass", "js"], function() {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch("src/*.pug", ["pug"]);
  gulp.watch("src/sass/*.scss", ["sass"]);
  gulp.watch("src/js/*.js", ["js"]);
});

// Compile Pug files into HTML in the dist folder.
gulp.task("pug", function() {
  return gulp
    .src("src/*.pug")
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

// Compile SCSS into HTML in the dist/css folder.
gulp.task("sass", function() {
  return gulp
    .src("src/sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

// Bundle JS files into the dist folder.
gulp.task("js", function() {
  return gulp
    .src("src/js/*js")
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
});

// Default Gulp command, run this file.
gulp.task("default", ["serve"]);
