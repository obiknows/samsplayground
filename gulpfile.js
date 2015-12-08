var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var harp         = require('harp');
var cp           = require('child_process');
var deploy       = require('gulp-gh-pages');
var addsrc       = require('gulp-add-src');

/*
 * Serve the Harp Site from the src directory
 */
gulp.task('serve', function () {
  harp.server(__dirname + "/src", {
    port: 9000
  }, function () {
     browserSync({
      proxy: "localhost:9000",
      open: false,
      /* Hide the notification. It gets annoying */
       notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    /* *
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(["*.css", "*.sass", "*.scss", "*.less"], function () {
      reload("main.css", {stream: true});
    });
    /** 
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["*.html", "*.ejs", "*.jade", "*.js", "*.json", "*.md"], function () {
      reload();
    });
  } )
}) ;

/*
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */ 
gulp.task('default', ['serve']);

/*
 * builds the harp site
 */
gulp.task('build', function (done) {
  cp.exec('harp compile src ./gh-pages', {stdio: 'inherit'})
    .on('close', done)
});

/*
 * builds and pushes build to gh-pages repo.
 */
var ghPages = {
	remoteUrl : "https://github.com/samnnodim/samnnodim.github.io",
	branch : "master"
}; 
gulp.task('deploy',['build'], function () {
  return gulp.src("./gh-pages/**/*")
		.pipe(addsrc("./README.md"))
    .pipe(deploy(ghPages))
});