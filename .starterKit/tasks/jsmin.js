const { src, dest } = require('gulp');
const compiler = require('webpack');
const clean = require('gulp-clean');
const webpack = require('webpack-stream');
const config = require('../config');
const gulpMerge = require('merge-stream');


export function jsCompileMin() {

  return gulpMerge(


    // cleaning directory, meaning deleting before compiling
    src(config.js.distDir, {allowEmpty: true})
    .pipe(clean({force: true})),

    src([
      `${config.js.srcDir}/index.js`
    ])
    .pipe(webpack({
        mode: 'production',
        output: {
          filename: 'script.js'
        },
        watch: false,
        module: {
          rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [['@babel/preset-env']]
              }
            }
          ],
        },
  
    }, compiler, function(err, stats){
      
    }))
    .pipe(dest(config.js.distDir))

  )

  
}
