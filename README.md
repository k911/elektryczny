# Elektryczny

phpbb3 theme fork
theme created for private purposes

`<phpBB>` phpBB3 installation path (where file 'config.php' is located)

## Installation

1. Clone this repository to:
	`<phpBB>/styles/`
	so your path to stylesheet.css (main css file) should look like:
	`<phpBB>/styles/elektryczny/theme/stylesheet.css`
2. Open cmd at directory
	`<phpBB>/styles/elektryczny/` 
3. Run
	`npm install`
4. Then
	`gulp init`
5. Theme is ready to use.

## Edit

- You can find and edit SASS files in:
	`<phpBB>/styles/elektryczny/theme/styles/`
	
## Compile

- You can use your private sass compiler to compile *.scss files in 
	`<phpBB>/styles/elektryczny/theme/`
- Or use previously defined gulp task
	- Open cmd at directory
		`<phpBB>/styles/elektryczny/`
	- Run `gulp compile-sass` to compile each *.scss files
- You can also turn on 'auto-compilation
	- Open cmd at directory
		`<phpBB>/styles/elektryczny/`
	- Run `gulp` or `gulp compile-sass:watch`
	- ..and you have turned on auto-compilation until you terminate cmd process
