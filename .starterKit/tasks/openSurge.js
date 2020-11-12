const open = require('gulp-open');
const config = require('../config');
const gulp = require('gulp');

export function openSurge() {
    const surgeUrl = `https://${config.surgeDomain}.surge.sh/`
    var options = {
        uri: surgeUrl,
        app: 'google chrome'
    };
    return open(
        gulp.src(__filename)
        .pipe(open(options))
    );
}
