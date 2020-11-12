

const pkg = require('../package');

const ConfigOptions = function () {
	const config = this;


  // source directory 
  config.srcDir = '../src'; 
  // dist directory
  config.distDir = '../dist';
  // dist assets directory
  config.assets = '../dist/assets';
  // surge domain name
  config.surgeDomain = 'rauxa-bms-outcomes';
  // eslint config file
  config.eslintConfig = '../.eslintrc.js';


  /*
   Framework scss/css directories
   ===================================
  */
	config.styles = {
    scssDir: `${config.srcDir}/styles`,
    distDir: `${config.assets}/css`,
  };

  /*
   Framework Javascript directories
   ===================================
   srcDir : source javascript
   distDir : compiled javascript
  */
 config.js = {
  srcDir: `${config.srcDir}/scripts`,
  distDir: `${config.assets}/js`,
 };

  /*
   Framework images directories
   ===================================
  */
 config.images = {
   srcDir: `${config.srcDir}/images`,
   distDir: `${config.assets}/images/`,
 }
 

  /*
   Framework fonts directories
   ===================================
  */
 config.fonts = {
  srcDir: `${config.srcDir}/fonts`,
  distDir: `${config.assets}/fonts/`,
}

  /*
   Framework Templates directories
   ===================================
  */
  config.templates = {
    html: `${config.srcDir}/templates/*.html`,
    hbs: `${config.srcDir}/templates/*.hbs`,
  };

};

module.exports = new ConfigOptions();