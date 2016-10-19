# Elektryczny

phpbb3 theme fork
theme created for private purposes
tested versions of phpbb:
- 3.2.0-RC1
theme will be maintained at least till phpbb release stable 3.2.0 version

`<phpBB>` phpBB3 installation path (where file 'config.php' is located)

## (optional) Installation

#### Theme is precompiled you do not have to use this instructions unless you want to make some changes to this theme / fork

1. Clone this repository to:
	`<phpBB>/styles/`
	so your path to stylesheet.css (main css file) should look like:
	`<phpBB>/styles/elektryczny/theme/stylesheet.css`
2. Open cmd at directory
	`<phpBB>/styles/elektryczny/` 
3. Run
	`npm install`
4. (optional) if you have not install gulp globally or you are not sure enter:
	`npm install --global gulp`
5. Then
	`gulp init`
6. Theme is ready to use.

## Edit

- You can find and edit SASS files in:
	`<phpBB>/styles/elektryczny/dev/styles/`
	
## Compile

- You can use your private sass compiler to compile *.scss files in 
	`<phpBB>/styles/elektryczny/dev/`
- Or use previously defined gulp task
	- Open cmd at directory
		`<phpBB>/styles/elektryczny/`
	- Run `gulp compile-sass` to compile each *.scss files
- You can also turn on auto-compilation and auto-uglify js files
	- Open cmd at directory
		`<phpBB>/styles/elektryczny/`
	- Run `gulp` or `gulp compile-sass:watch` and `gulp uglify-js:watch`
	- ..and you have turned on auto-compilation until you terminate cmd process
- Command `gulp cleanup` removes whole stuff created by script `gulp init`
