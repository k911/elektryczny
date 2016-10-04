# Elektryczny

phpbb3 theme fork
theme created for private purposes

<phpBB> - phpBB3 installation path (where file 'config.php' is located)

## Installation

1. Clone this repository to:
	`<phpBB>/styles/`
	so your path to stylesheet.css (main css file) should look like:
	`<phpBB>/styles/elektryczny/theme/stylesheet.css`
2. Theme is precopiled, and ready to use.
3. (optional) Open cmd at directory
	`<phpBB>/styles/elektryczny/` 
	and run
	`nmp install`
	
optional - only when you want to edit and compile this theme

## Edit

1. You can find and edit SASS files in:
	`<phpBB>/styles/elektryczny/theme/styles/`
	
## Compile

0. You have to make step 3 from [Installation](https://github.com/k911/elektryczny#installation) in case to use bellow sass compilers

#### Node-sass

1. Open cmd at directory
	`<phpBB>/styles/elektryczny/`
2. Run script 
	`npm run compile-sass` to compile stylesheet.scss
	`npm run compile-sass-print` to compile print.scss

#### Gulp (TODO)

1. Open cmd at directory 
	`<phpBB>/styles/elektryczny/`
2. Run script 
	`sudo gulp` to compile
