var gulp = require('gulp'),
    sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	clean = require('gulp-clean');

/**
 * @var array 'sassSrc' sass files included for compilation tasks 
 * @var string 'sassDest' destination for compiled sass files
 * @var gulp-sass.Options 'sassConfig'
 */
var settings = {
	sassSrc: ['theme/*.scss', '!_*.scss'],
	sassDest: 'theme',
    sassConfig: {
        outputStyle: 'compressed' // ['nested', 'expanded', 'compact', 'compressed']
    },
	defaultTasks: ['info', 'compile-sass:watch']
};

/**
 * Initialize all needed for first time
 */
 gulp.task('init', ['copy-files', 'compile-sass']), function() {
	console.log('Doing some things..');
 }

/**
 * Show default info
 */
gulp.task('info', function() {
	console.log('\nCurrent settings:\n');
	console.log(settings);
	console.log('\n');
});

gulp.task('clean-files', function() {
	return gulp.src('theme/fonts', {read: false})
		.pipe(clean())
		.pipe(notify('Deleted: <%= file.relative %>'));
});

/**
 * Copy files from installed dependencies
 */
gulp.task('copy-files', ['clean-files'], function() {
	return gulp.src('node_modules/mdi/fonts/*', {base: 'node_modules/mdi/fonts/'})
		.pipe(gulp.dest('theme/fonts'))
		.pipe(notify('Copied dependecy: <%= file.relative %>'));
});

/**
 * Compile all styles task
 */
gulp.task('compile-sass', function() {
    return gulp.src(settings.sassSrc)
        .pipe(sass(settings.sassConfig).on('error', sass.logError))
        .pipe(gulp.dest(settings.sassDest))
		.pipe(notify('Compiled, minified: <%= file.relative %>'));
});

/**
 * Auto compile all styles task during changes
 */
gulp.task('compile-sass:watch', function() {
	console.log('\nAuto-compiling enabled\n');
	gulp.watch(['theme/*.scss', 'theme/styles/*.scss'], ['compile-sass']);
});

/**
 * @experimental
 * Compile all styles task with source maps
 * TODO: in the future
 */
gulp.task('compile-sass-maps', function() {
    return gulp.src(settings.sassSrc)
		.pipe(sourcemaps.init())
        .pipe(sass(settings.sassConfig).on('error', sass.logError))
        .pipe(gulp.dest(settings.sassDest))
		.pipe(sourcemaps.write('theme/maps'))
		.pipe(notify('Compiled, minified and created sourcemap: <%= file.relative %>'));
});

/**
 * @default tasks
 */
gulp.task('default', settings.defaultTasks);