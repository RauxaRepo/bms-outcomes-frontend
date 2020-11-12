const surge = require('gulp-surge');
const config = require('../config');

export function surgeDeploy() {
    let distBuild = `${config.distDir}`;
    let surgeDomain = `${config.surgeDomain}`;

    return surge({
        project: distBuild,
        domain: `${surgeDomain}.surge.sh`
    });
    
  }
  