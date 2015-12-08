var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
var ghPages = {
	remoteUrl : "https://github.com/samnnodim/samnnodim.github.io",
	branch : "master"
};
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy(ghPages))
});