const bs = require("browser-sync").create();
const fs = require("fs");
const Mustache = require("mustache");
const { StringDecoder } = require("string_decoder");

const decoder = new StringDecoder("utf8");

bs.watch("app/CourseSelect/CourseSelect.mustache").on("change", templatePath => {
  fs.readFile(templatePath, (err, templateBuffer) => {
    if (err) throw err;

    fs.readFile("app/CourseSelect/Fall_2018_Courses_View.json", (err, viewBuffer) => {
      if (err) throw err;

      const template = decoder.end(templateBuffer);
      const view = JSON.parse(decoder.end(viewBuffer));
      const renderedTemplate = Mustache.render(template, view);
      fs.writeFile("dist/CourseSelect.html", renderedTemplate, err => {
        if (err) throw err;
      });
      bs.reload("dist/CourseSelect.html")
    });
  });
});

bs.init({
  server: {
    baseDir: "dist",
    index: "CourseSelect.html"
  },
  files: ["app/index.css", "app/CourseSelect/CourseSelect.css"],
});
