const { src, dest } = require('gulp');
const clean = require('gulp-clean');
const gulpMerge = require('merge-stream');
const hb = require('gulp-hb');
const livereload = require('gulp-livereload');
const config = require('../config');
const minifyHTML = require('gulp-htmlmin');

export function hbs() {



  return gulpMerge(

    src(`${config.distDir}/*.html`, {read: false})
    .pipe(clean({force: true})),

    src(`${config.templates.html}`)
    .pipe(hb()
      .partials(`${config.srcDir}/templates/hbs/_includes/components/*.hbs`)
      .partials(`${config.srcDir}/templates/hbs/_includes/globals/*.hbs`)
    )
    // .pipe(minifyHTML({collapseWhitespace: true}))
    .pipe(dest(config.distDir))
    .pipe(livereload())

  );
  
}