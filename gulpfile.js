const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const mustache = require("gulp-mustache");
const rename = require('gulp-rename')
const concat = require("gulp-concat");

gulp.task("serve", ["template"], () => {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "CourseSelect.html"
    }
  });

  gulp.watch("app/**/*.mustache", ["template"]);
  gulp.watch("app/**/*.css", ["css"])
  gulp.watch("dist/*.html", browserSync.reload);
});

gulp.task("template", ["templateCourseSelect"]);

gulp.task("templateCourseSelect", () => {
  // head.mustache automatically searched for at runtime based on path of partial
  return gulp
    .src("app/CourseSelect/CourseSelect.mustache", {base: 'app/CourseSelect'})
    .pipe(mustache("app/CourseSelect/Fall_2018_Courses_View.json"))
    .pipe(rename("CourseSelect.html"))
    .pipe(gulp.dest("dist/"));
});

gulp.task("css", () => {
  return gulp
    .src("app/**/*.css", {base: 'app'})
    .pipe(concat("index.css"))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream())
});

gulp.task("build", ["template", "css"]);

gulp.task("default", ["serve"]);
