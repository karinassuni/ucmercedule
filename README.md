# UC Mercedule
A web app for planning semesters at UC Merced!

The deprecated, summer 2015 version of UC Mercedule can be found [here](1). And
the inevitable (incomplete) React remake can be found [here](2). It was my first
large programming project, and it accomplished its goals despite being very
messy. Now, however, I want to make it a fully-fledged Progressive Web App, and
done cleanly.

## Development
Start the Webpack dev server with `npm start` and go to town! Hot module
reloading (HMR) is set up, so code changes will immediately be reflected in the
browser.

Course sections are scraped with [ucmscraper](2), written in Python. 

I orignally used [Gulp](6) as my build system, with a [browsersync](5) HMR dev
server. I switched to [Webpack](7) once I knew that I'd be best to build the
scheduler with [Preact](8), 1) because Preact requires Webpack for HMR and 2)
because having two separate build systems for two parts of the application
(CourseSelect templated with [Mustache](4) and Schedule with Preact) would be
too complicated. Besides, I needed to learn Webpack eventually anyways!

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
[7]: https://webpack.js.org
[8]: https://preactjs.com