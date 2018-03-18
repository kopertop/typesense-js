'use strict'

import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import del from 'del'

gulp.task('build', function () {
  let stream = browserify({
    entries: './src/Typesense/Client.js',
    debug: true,
    standalone: 'Typesense'
  }).transform('babelify', {presets: ['env']})
    .bundle()
    .pipe(source('Typesense.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))

  if (process.env.NODE_ENV === 'production') {
    stream = stream.pipe(uglify())
  }

  stream = stream.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./lib/'))

  return stream
})

gulp.task('clean', function () {
  return del([
    'lib/**'
  ])
})
