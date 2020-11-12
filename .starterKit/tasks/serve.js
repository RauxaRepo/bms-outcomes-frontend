const {
  src,
  dest
} = require('gulp');
const server = require('gulp-server-livereload');
const config = require('../config');

export function localServe() {

  let localhostAddr = 'localhost';

  return src(config.distDir)
    .pipe(server({
      host: localhostAddr,
      livereload: true,
      open: true,
      clientConsole: false,
    }));

}