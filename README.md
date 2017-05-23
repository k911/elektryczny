# Elektryczny Theme

phpbb3 theme
theme created for private purposes (preview: https://elektryczny.tk/forum/)

tested on phpBB v3.2.0

`<phpBB>` phpBB3 installation path (where file 'config.php' is located)

## Installation

1. Clone this repository to:
	`<phpBB>/styles/`
	so your path to stylesheet.css (main css file) should look like:
	`<phpBB>/styles/elektryczny/theme/stylesheet.css`
2. That's all.

## Google Analytics

To template files is included commented out script for google analytics.
You can simply uncomment that block and replace `XXXX` with your google analytics id.
Following files need to be edited:
- template/overall_footer.html
- template/simple_footer.html
- template/viewtopic_print.html

You do NOT have to recompile theme afterwards.

## Development

#### Theme is precompiled you do not have to follow next instructions unless you want to make some changes

1. Open cmd at directory
	`<phpBB>/styles/elektryczny/` 
2. Run
	`npm install`
3. Then
	`npm start`
4. If no errors occured, theme should be ready to use.

- JS files are in:
	`<phpBB>/styles/elektryczny/src/scripts/`
- SASS files in:
	`<phpBB>/styles/elektryczny/src/styles/`
- Downloaded dependencies are keeped in
	`<phpBB>/styles/elektryczny/src/download/`
	
## Commands

- Intialization (compile, uglify, download and copy dependencies):
	`npm start`
- Check results in linters:
	`npm run lint`
- Cleanup all 
	`npm run clean`
- Auto-compilation/uglification of scripts/sass files
	`npm run auto`
