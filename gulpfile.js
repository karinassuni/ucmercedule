const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const mustache = require("gulp-mustache");
const rename = require("gulp-rename");
const concat = require("gulp-concat");

gulp.task("serve", ["build"], () => {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "Schedule.html"
    }
  });

  gulp.watch("app/**/*.mustache", ["template"]);
  gulp.watch("app/**/*.css", ["css"]);
  gulp.watch("app/**/*.js", ["js"]);
  gulp.watch("dist/*.html", browserSync.reload);
});

gulp.task("template", ["templateCourseSelect", "templateSchedule"]);

gulp.task("templateCourseSelect", () => {
  // head.mustache automatically searched for at runtime based on path of partial
  return gulp
    .src("app/CourseSelect/CourseSelect.mustache", { base: "app/CourseSelect" })
    .pipe(mustache("app/CourseSelect/Fall_2018_Courses_View.json")) // just for development
    .pipe(rename("CourseSelect.html"))
    .pipe(gulp.dest("dist/"));
});

gulp.task("templateSchedule", () => {
  // head.mustache automatically searched for at runtime based on path of partial
  return gulp
    .src("app/Schedule/Schedule.mustache")
    .pipe(mustache("app/Schedule/sample_schedule_courses.json")) // just for development
    .pipe(rename("schedule.html"))
    .pipe(gulp.dest("dist/"));
});

gulp.task("css", () => {
  return gulp
    .src("app/**/*.css", { base: "app" })
    .pipe(concat("index.css"))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src("app/**/*.js", { base: "app" })
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});

gulp.task("build", ["template", "css", "js"]);

gulp.task("default", ["serve"]);
