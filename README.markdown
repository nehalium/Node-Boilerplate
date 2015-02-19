# Boilerplate Project
Project description, Version #.


## Local Environment Setup
1. Install:
	* [Git](http://git-scm.com/)
	* [Node](http://nodejs.org/) & [NPM](https://npmjs.org/)
1. Clone the repository.
	* `cd {YOUR_GIT_HOME}`
	* `git clone https://{YOUR_USERNAME}@{YOUR_GIT_REPO}`
1. Use NPM to also install Bower and Grunt.
	* `npm install -g bower grunt-cli` 
1. Install project dependencies.
	* `cd {YOUR_GIT_HOME}/{PROJECT_NAME}`
	* `npm install`
	* `bower install`
1. Run `grunt` to bootstrap your local environment.


## Production

Run `grunt prod` to build and compile all production assets.

* For Sandbox:
	`NODE_ENV=SAND forever -o logs/out.log -e logs/err.log start server.js`

* For Production:
	`grunt prod` (builds prod files and runs tests once for CI to parse junit XML)
	OR
	`NODE_ENV=PROD forever -o logs/out.log -e logs/err.log start server.js`


### NOTE(s)
* The default is http://localhost:3000.  Sandbox and Production will be port 8080.
* By default, `grunt test` is configured to run before `git push` via a `pre-push` hook. To bypass this, run `git push --no-verify`.


## Grunt Tasks

### Local environment

* `grunt`: Builds dev files, starts servers (node, jasmine_node and karma) and sets watches to auto-compile EJS and LESS files. It stays in the foreground until you kill the Grunt process with `CTRL + C`. Run this when working on your local environment.
* `grunt build:dev`: Compiles EJS and LESS files and exits. Run this when you want to recompile all EJS and LESS files.
* `grunt build:prod`: Compiles, minifies and cache-busts EJS and LESS templates and exits. Run this when you want to test compiled + minified assets for production.
* `grunt test:(server|unit|e2e)`: Runs the specific type of tests and exits. Run this when you just want to test specific areas of code.
* `grunt test`: Runs `build:dev`, _all_ tests and exits. This will be automatically run before `git push`.

### CI environment
* `grunt prod`: Builds files for production, runs all tests (which generates JUnit XML reports) and exits. This is automatically run in the Bamboo CI server.
