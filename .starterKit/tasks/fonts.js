const { src, dest } = require('gulp');
const clean = require('gulp-clean');
const gulpMerge = require('merge-stream');
const config = require('../config');

export function fonts() {


  return gulpMerge(

    src(`${config.fonts.distDir}/**/*`, {read: false})
    .pipe(clean({force: true})),

    src(`${config.fonts.srcDir}/**/*`)
    .pipe(dest(config.fonts.distDir))

  );
  
}