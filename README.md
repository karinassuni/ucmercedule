# UC Mercedule
A web app for planning semesters at UC Merced!

The deprecated, summer 2015 version of UC Mercedule can be found [here](1). And
the inevitable (incomplete) React remake can be found [here](2). It was my first
large programming project and so I'm attached, okay!

## Developing
Run `npx gulp` and go to town on the HTML and CSS!

Course sections were scraped with [ucmscraper](2), written in Python. I plan on
rewriting it in Javascript in this package, for faster scraping of seat counts
and for seamless interop. In the meantime, courses are read from the static
`app/CourseSelect/Fall_2018_Courses_View.json`, generated with ucmscraper and
some now-deleted backend code (you can find it in the `backend/` folder in older
commits).

I use [Mustache](3) for templating—I didn't need anything more complicated—and
[browsersync](4) for live CSS and JS injecting/HTML refreshing. Build system set
up with [Gulp](5).

## Inspiration
At freshman orientation, we had to plan our class schedules on
paper. I was the last person to finish, and I knew that a web app could make
this easier; hence UC Mercedule.

Also, for the record, I pronounce it "UC Mer-schedule." But "Mercedule" looks
nicer.

[1]: https://github.com/karinassuni/karinassuni.github.io
[2]: https://github.com/karinassuni/ucmercedule-react
[3]: https://github.com/karinassuni/ucmscraper
[4]: http://mustache.github.io
[5]: https://www.browsersync.io
[6]: https://gulpjs.com