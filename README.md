# Elektryczny

phpbb3 theme
theme created for private purposes (preview: http://elektryczny.tk/forum/)
tested on phpBB v3.2.0

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
	`gulp init` or `npm run init`
6. If no errors occured, theme should be ready to use.

## Edit

- JS files are in:
	`<phpBB>/styles/elektryczny/src/scripts/`
- SASS files in:
	`<phpBB>/styles/elektryczny/src/styles/`
- Downloaded dependencies are keeped in
	`<phpBB>/styles/elektryczny/src/download/`
	
## Comands

- Intialization (compile, uglify, download and copy dependencies):
	`npm run init` or `gulp init`
- Cleanup all 
	`npm run clean` or `gulp cleanup`
- Auto-compilation/uglification of scripts/sass files
	`npm run watch` or `gulp`
