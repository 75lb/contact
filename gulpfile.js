var gulp = require("gulp"),
    jshint = require("gulp-jshint");

gulp.task("lint", function(){
    gulp.src([ "lib/*.js", "terminal/**/*.js", "web/**/*.js", "!web/bundle.js", "gulpfile.js" ])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("default", [ "lint" ]);
