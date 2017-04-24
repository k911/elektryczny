// External dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const download = require('gulp-download-stream');
const fs = require('fs');

/**
 * @var string 'jsSrc' js files to uglify (minify)
 * @var string 'jsDest' destination of the compiled js files
 * @var array 'sassWatch' files that needs to be watched for auto-compiling sass
 * @var array 'sassSrc' sass files included for compilation tasks
 * @var string 'sassDest' destination for compiled sass files
 * @var gulp-sass.Options 'sassConfig'
 * @var array 'defaultTask' tasks run on 'default' task is invoked
 *      eg. when in cmd is typed only 'gulp'
 */
const settings = {
  jsSrc: 'src/scripts/*.js',
  jsDest: 'template',
  fontsMdiSrc: '**/materialdesignicons-webfont.*',
  fontsMdiSrcBase: 'node_modules/mdi/fonts',
  fontsRobotoSrc: ['**/Roboto-Medium.*', '**/Roboto-Light.*', '**/Roboto-Regular.*'],
  fontsRobotoSrcBase: 'node_modules/roboto-fontface/fonts',
  fontsDest: 'theme/fonts',
  sassWatch: ['src/*.scss', 'src/styles/*.scss'],
  sassSrc: ['src/*.scss', '!_*.scss'],
  sassDest: 'theme',
  sassConfig: {
    outputStyle: 'compressed',
    errLogToConsole: true,
    onError(err) {
      return notify().write(err);
    }
  },
  downloadSrc: [
    // {
    //   url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500&subset=latin-ext',
    //   file: 'google-fonts.css',
    // },
  ],
  downloadDest: 'src/download',
  defaultTasks: ['info', 'compile-sass:watch', 'uglify-js:watch'],
  cleanupFiles: ['theme/*.css', 'theme/*.css.map', 'template/*.js', 'src/download']
};

/**
 * Initialize all needed for first time
 */
gulp.task('init', ['copy-fonts', 'compile-sass', 'uglify-js'], () => {
  console.info('Doing some things..');
});

/**
 * Show default info
 */
gulp.task('info', () => {
  console.info('\nCurrent settings:\n');
  console.info(settings);
  console.info('\n');
});

gulp.task('download-if-not-exists', () => {
  const files = settings.downloadSrc.map(obj => `${settings.downloadDest}/${obj.file}`);
  let foundAll = true;
  try {
    files.forEach((file) => {
      fs.statSync(file);
    });
  } catch (err) {
    foundAll = false;
  }

  if (!foundAll) {
    console.info('Started download..');
    return download(settings.downloadSrc)
      .pipe(gulp.dest(settings.downloadDest));
  }
  console.info('Files already downloaded.');
  return null;
});

/**
 * Deletes old folder with fonts
 */
gulp.task('clean-fonts', () => gulp.src(settings.fontsDest, { read: false })
  .pipe(clean())
  .pipe(notify('Deleted: <%= file.relative %>')));


/**
 * Copy mdi fonts from installed dependencies
 */
gulp.task('copy-roboto-fonts', ['clean-fonts'],
  () => gulp.src(settings.fontsRobotoSrc, { base: settings.fontsRobotoSrcBase })
    .pipe(gulp.dest(settings.fontsDest))
    .pipe(notify('Copied: <%= file.relative %>')));

/**
 * Copy mdi fonts from installed dependencies
 */
gulp.task('copy-fonts', ['copy-roboto-fonts'],
  () => gulp.src(settings.fontsMdiSrc, { base: settings.fontsMdiSrcBase })
    .pipe(gulp.dest(settings.fontsDest))
    .pipe(notify('Copied: <%= file.relative %>')));

/**
 * Task to do general cleanup in project
 * Deletes all compiled, copied or minified/uglified files
 */
gulp.task('cleanup', ['clean-fonts'], () => gulp.src(settings.cleanupFiles, {
  read: false
})
  .pipe(clean())
  .pipe(notify('Deleted: <%= file.relative %>')));

/**
 * Compile all styles and create source maps
 * CUSM = Compiled, Ugflified (Minified), Source Maps created
 */
gulp.task('compile-sass', ['download-if-not-exists'], () => gulp.src(settings.sassSrc)
  .pipe(sourcemaps.init())
  .pipe(sass(settings.sassConfig))
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest(settings.sassDest))
  .pipe(notify('CUSM: <%= file.relative %>')));

/**
 * Auto compile all styles task during changes
 */
gulp.task('compile-sass:watch', ['compile-sass'], () => {
  console.info('\nAuto-compiling sass enabled\n');
  gulp.watch(settings.sassWatch, ['compile-sass']);
});

/**
 * Minify all javascript and create source maps task
 * USM = Ugflified and Source Maps created
 */
gulp.task('uglify-js', () => gulp.src(settings.jsSrc)
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(settings.jsDest))
  .pipe(notify('USM: <%= file.relative %>')));

/**
 * Auto uglify javascript task during changes
 */
gulp.task('uglify-js:watch', ['uglify-js'], () => {
  console.info('\nAuto-uglifing js enabled\n');
  gulp.watch(settings.jsSrc, ['uglify-js']);
});

/**
 * @default tasks
 */
gulp.task('default', settings.defaultTasks, () => {
  console.info('\nDeflaut tasks successfully invoked.\n');
});
