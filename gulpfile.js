"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");

gulp.task("build", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(postcss([require("tailwindcss/nesting"), require("tailwindcss")]))
    .pipe(sass())
    .pipe(gulp.dest("./build/"));
});


gulp.task("watch", function () {
  gulp.watch(
    ["./src/scss/**/*.scss" , "./pages/**/*.html","./src/js/**/*.js"],
    gulp.series("build")
  );
});
