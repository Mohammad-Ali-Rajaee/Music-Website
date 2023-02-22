"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");

gulp.task("build", () => {
  return gulp
    .src("./music-react/src/**/*.scss")
    .pipe(postcss([require("tailwindcss/nesting"), require("tailwindcss")]))
    .pipe(sass())
    .pipe(gulp.dest("./music-react/src"));
});


gulp.task("watch", function () {
  gulp.watch(
    ["./music-react/src/**/*.scss" , "./music-react/src/**/*.js"],
    gulp.series("build")
  );
});
