// External dependencies
var gulp = require('gulp'),
    sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	clean = require('gulp-clean'),
	uglify = require('gulp-uglify')
	download = require('gulp-download-stream'),
	fs = require('fs');

/**
 * @var string 'jsSrc' js files to uglify (minify)
 * @var string 'jsDest' destination of the compiled js files
 * @var array 'sassWatch' files that needs to be watched for auto-compiling sass
 * @var array 'sassSrc' sass files included for compilation tasks 
 * @var string 'sassDest' destination for compiled sass files
 * @var gulp-sass.Options 'sassConfig'
 * @var array 'defaultTask' tasks run on 'default' task is invoked eg. when in cmd is typed only 'gulp'
 */
var settings = {
	jsSrc: 'src/javascript/*.js',
	jsDest: 'template',
	sassWatch: ['src/*.scss', 'src/styles/*.scss'],
	sassSrc: ['src/*.scss', '!_*.scss'],
	sassDest: 'theme',
    sassConfig: {
        outputStyle: 'compressed' // ['nested', 'expanded', 'compact', 'compressed']
    },
	downloadSrc: [
		{ 
			url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500&subset=latin-ext',
			file: 'google-fonts.css'
		}
	],	
	downloadDest: 'src/download',
	defaultTasks: ['info', 'compile-sass:watch', 'uglify-js:watch']
};

/**
 * Initialize all needed for first time
 */
 gulp.task('init', ['copy-fonts', 'compile-sass', 'uglify-js']), function() {
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

gulp.task('download-if-not-exists', function() 
{
	var files = settings.downloadSrc.map(function(obj){return settings.downloadDest + '/' + obj.file});
	var foundAll = true;
	try {
		files.forEach(function(file)
		{
			fs.statSync(file);
		});
	} catch(err)
	{
		foundAll = false;
	}

	if(!foundAll)
	{
		console.log('Started download..');
		return download(settings.downloadSrc)
			.pipe(gulp.dest(settings.downloadDest));
	} else {
		console.log('Files already downloaded.');
	}
});

/**
 * Deletes old folder with fonts
 */
gulp.task('clean-fonts', function() {
	return gulp.src('theme/fonts', {read: false})
		.pipe(clean())
		.pipe(notify('Deleted: <%= file.relative %>'));
});

/**
 * Copy mdi fonts from installed dependencies
 */
gulp.task('copy-fonts', ['clean-fonts'], function() {
	return gulp.src('node_modules/mdi/fonts/*', {base: 'node_modules/mdi/fonts/'})
		.pipe(gulp.dest('theme/fonts'))
		.pipe(notify('Copied dependecy: <%= file.relative %>'));
});

/**
 * Task to do general cleanup in project
 * Deletes all compiled, copied or minified/uglified files
 */

gulp.task('cleanup', ['clean-fonts'], function() {
	return gulp.src(['theme/*.css', 'template/*.js', 'src/download'], {read: false})
		.pipe(clean())
		.pipe(notify('Deleted: <%= file.relative %>'));
});

/**
 * Compile all styles task
 */
gulp.task('compile-sass', ['download-if-not-exists'], function() {
    return gulp.src(settings.sassSrc)
        .pipe(sass(settings.sassConfig).on('error', sass.logError))
        .pipe(gulp.dest(settings.sassDest))
		.pipe(notify('Compiled, minified: <%= file.relative %>'));
});

/**
 * Auto compile all styles task during changes
 */
gulp.task('compile-sass:watch', ['compile-sass'], function() {
	console.log('\nAuto-compiling sass enabled\n');
	gulp.watch(settings.sassWatch, ['compile-sass']);
});

/**
 * Minify all javascript task
 */
gulp.task('uglify-js', function(){
	return gulp.src(settings.jsSrc)
		.pipe(uglify())
		.pipe(gulp.dest(settings.jsDest))
		.pipe(notify('Uglified: <%= file.relative %>'));;
});

/**
 * Auto uglify javascript task during changes
 */
gulp.task('uglify-js:watch', ['uglify-js'], function() {
	console.log('\nAuto-uglifing js enabled\n');
	gulp.watch(settings.jsSrc, ['uglify-js']);
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
gulp.task('default', settings.defaultTasks, function() {
	console.log('\nDeflaut tasks successfully invoked.\n');
});
