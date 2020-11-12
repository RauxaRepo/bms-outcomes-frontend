const { src, dest } = require('gulp');
const clean = require('gulp-clean');
const gulpMerge = require('merge-stream');
const config = require('../config');

export function localImages() {



  return gulpMerge(

    src(`${config.images.distDir}/**/*`)
    .pipe(clean({force: true})),

    src(`${config.images.srcDir}/**/*`)
    .pipe(dest(config.images.distDir))

  );
  
}