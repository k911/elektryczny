/**
 * [Created by FeiryCod]
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');

// Here you can specify the output style of .css file
// as like the other options
var Options = {
    SassOutputStyle: {
        outputStyle: 'compressed'
    } //nested, expanded, compact, compressed (gulp-sass)

};

// Styles Tasks
// Compile scss to css
gulp.task('styles', function() {

    console.log(Options.SassOutputStyle);
    return gulp.src('theme/stylesheet.scss')
        .pipe(sass(Options.SassOutputStyle).on('error', sass.logError))
        .pipe(gulp.dest('theme'))
        .pipe(livereload());

});

//Watch Task
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('theme/styles/*.scss', ['styles']);
    gulp.watch('views/*', function() {
        livereload.reload('template/*');
    });

});
gulp.task('default', ['styles', 'watch']);
