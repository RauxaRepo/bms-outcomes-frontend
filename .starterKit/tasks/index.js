
const { series, parallel, task } = require('gulp');
const config = require('../config');
const watch = require('gulp-watch');



import { sassCompile } from './sass';
import { jsCompile } from './js';
import { jsCompileMin } from './jsmin';
import { localImages } from './images';
import { fonts } from './fonts';
import { hbs } from './hb';
import { localServe } from './serve';
import { surgeDeploy } from './surgeDeploy';
import { openSurge } from './openSurge';



let watchers = function() {

  const watchHbs = watch([
    config.templates.html,
    `${config.srcDir}/templates/hbs/_includes/components/*.hbs`,
    `${config.srcDir}/templates/hbs/_includes/globals/*.hbs`
  ]);
  watchHbs.on('change', function(path, stats) {
    console.log('========== running localViews ==========');
    hbs();
  });


  const watchLocalImages = watch(config.images.srcDir);
  watchLocalImages.on('change', function(path, stats) {
    console.log(path);
    localImages();
  }).on('add', function(path, stats) {
    console.log(path);
    localImages();
  }).on('unlink', function(path, stats) {
    console.log(path);
    localImages();
  });

  const watchSass = watch(`${config.styles.scssDir}/**/*`);
  watchSass.on('change', function(path, stats) {
    console.log('========== running SassCompile ==========');
    sassCompile();
  });

  const watchJs = watch([
    `${config.js.srcDir}/**/*.js`
  ]);
  watchJs.on('change', function(path, stats) {
    console.log('========== running JsCompile ==========');
    jsCompile();
  });
}

exports.dev = series(
  hbs,
  parallel(
    jsCompile,
    sassCompile,
  ),
  localImages,
  fonts, 
  localServe,
  watchers
);

exports.deploy = series(
  hbs,
  parallel(
    jsCompileMin,
    sassCompile,
  ),
  localImages,
  fonts,
  surgeDeploy,
  openSurge,
);

exports.prod = series(
  hbs,
  parallel(
    jsCompileMin,
    sassCompile,
  ),
  localImages,
  fonts,
  localServe
);





