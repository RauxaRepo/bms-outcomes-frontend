const { src, dest } = require('gulp');
const gulpMerge = require('merge-stream');
const sasslint = require('gulp-sass-lint');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const discardcomments = require('postcss-discard-comments');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const config = require('../config');


export function sassCompile(){ 

  let templateSass = `${config.styles.scssDir}/style.scss`;
  let plugins = [
    autoprefixer (),
    discardcomments()
  ];

  return gulpMerge(

    src([
      `${config.styles.scssDir}/_includes/components/*.scss`, 
      `${config.styles.scssDir}/_includes/globals/*.scss`,
      `${config.styles.scssDir}/_includes/themes/*.scss`,
      `${config.styles.scssDir}/_includes/utilities/*.scss`,
      `${config.styles.scssDir}/_includes/layout/*.scss`,
      `${config.styles.scssDir}/_includes/pages/*.scss`,
      `${config.styles.scssDir}/style.scss`])
    .pipe(sasslint({
        rules: {
          'property-sort-order': 0,
          'class-name-format': 0,
          'force-element-nesting': 0
        }
      }))
    .pipe(sasslint.format()),
    // .pipe(sasslint.failOnError()),

    // cleaning directory, meaning deleting before compiling
    src(config.styles.distDir, {allowEmpty: true}),
    // .pipe(clean({force: true})),

    src(templateSass)
    // sourcemaps init | based on development flag
    .pipe(gulpif(argv.development, sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(argv.development, sass({ outputStyle: 'expanded'}).on('error',sass.logError)))
    .pipe(gulpif(argv.production, sass({ outputStyle: 'compressed'}).on('error',sass.logError)))
    .pipe(postcss(plugins))
    // writing sourcemaps | based on development flag
    .pipe(gulpif(argv.development, sourcemaps.write('.')))
    // adding name
    .pipe(rename({basename: 'style'}))
    // sends to dist folder
    .pipe(dest(config.styles.distDir)),

  );
  
}
