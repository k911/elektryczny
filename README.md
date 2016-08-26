## Elektryczny

phpbb theme fork
theme created for private purposes

To help us build the theme all you have to do is follow these simple steps.
These instructions are for Unix operating systems
(MacOSX / Linux)

 1. Install XAMPP from this [page.](https://www.apachefriends.org/pl/index.html)
 2. Next is a [phpBB](https://bitnami.com/stack/phpbb) simply go to this link an install it via bitnami
 3. Install  [nodejs](https://nodejs.org/en/) (it will install node and npm as well)
 4. Install nodejs and npm.
 5. Clone our repo to the place where you've installed XAMPP.

  `cd /opt/lampp/apps/phpbb/htdocs/styles
     git clone <our repo>
     sudo chmod 777 -R /opt/lampp`

 6. Go to the localhost/phpbb -> Administration Control Panel -> customise -> styles -> details -> Elektryczny (active: Yes, Make default style: Yes)
after this deactivate prosilver theme.
 7. Go to our repo type npm install.

 8. Type in terminal:
`cd /opt/lampp/apps/phpbb/htdocs/styles/elektryczny && npm install && sudo gulp`
 9. I highly recommend you to download this [plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdle)
 Be sure to turn it on when you are on phpbb site modifying .scss files.

 10. Every time you want to start work with stylesheets type `sudo gulp` in terminal.

 Happy Coding ;)


----------


 You are ready to work (by default it will watch for all changes you have made in a repo and autocompile .scss files to pure .css).
