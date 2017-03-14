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
	jsSrc: 'src/scripts/*.js',
	jsDest: 'template',
	fontsDest: 'theme/fonts',
	sassWatch: ['src/*.scss', 'src/styles/*.scss'],
	sassSrc: ['src/*.scss', '!_*.scss'],
	sassDest: 'theme',
    sassConfig: {
        outputStyle: 'compressed', // ['nested', 'expanded', 'compact', 'compressed']
		errLogToConsole: true,
		onError: function(err)
		{
			return notify().write(err);
		}
    },
	downloadSrc: [
		{ 
			url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500&subset=latin-ext',
			file: 'google-fonts.css'
		}
	],	
	downloadDest: 'src/download',
	defaultTasks: ['info', 'compile-sass:watch', 'uglify-js:watch'],
	cleanupFiles: ['theme/*.css', 'theme/*.css.map', 'template/*.js', 'src/download'],
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
	return gulp.src(settings.fontsDest, {read: false})
		.pipe(clean())
		.pipe(notify('Deleted: <%= file.relative %>'));
});

/**
 * Copy mdi fonts from installed dependencies
 */
gulp.task('copy-fonts', ['clean-fonts'], function() {
	return gulp.src('node_modules/mdi/fonts/*', {base: 'node_modules/mdi/fonts/'})
		.pipe(gulp.dest(settings.fontsDest))
		.pipe(notify('Copied: <%= file.relative %>'));
});

/**
 * Task to do general cleanup in project
 * Deletes all compiled, copied or minified/uglified files
 */
gulp.task('cleanup', ['clean-fonts'], function() {
	return gulp.src(settings.cleanupFiles, {read: false})
		.pipe(clean())
		.pipe(notify('Deleted: <%= file.relative %>'));
});

/**
 * Compile all styles and create source maps
 * CUSM = Compiled, Ugflified (Minified), Source Maps created
 */
gulp.task('compile-sass', ['download-if-not-exists'], function() {
    return gulp.src(settings.sassSrc)
		.pipe(sourcemaps.init())
        	.pipe(sass(settings.sassConfig))
		.pipe(sourcemaps.write(''))
        .pipe(gulp.dest(settings.sassDest))
		.pipe(notify('CUSM: <%= file.relative %>'));
});

/**
 * Auto compile all styles task during changes
 */
gulp.task('compile-sass:watch', ['compile-sass'], function() {
	console.log('\nAuto-compiling sass enabled\n');
	gulp.watch(settings.sassWatch, ['compile-sass']);
});

/**
 * Minify all javascript and create source maps task
 * USM = Ugflified and Source Maps created
 */
gulp.task('uglify-js', function(){
	return gulp.src(settings.jsSrc)
		.pipe(sourcemaps.init())
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(settings.jsDest))
		.pipe(notify('USM: <%= file.relative %>'));;
});

/**
 * Auto uglify javascript task during changes
 */
gulp.task('uglify-js:watch', ['uglify-js'], function() {
	console.log('\nAuto-uglifing js enabled\n');
	gulp.watch(settings.jsSrc, ['uglify-js']);
});

/**
 * @default tasks
 */
gulp.task('default', settings.defaultTasks, function() {
	console.log('\nDeflaut tasks successfully invoked.\n');
});
