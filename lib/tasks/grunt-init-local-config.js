var fs = require('fs');
var EXAMPLE_CONFIG_FILE = 'config/env/local.example.js';
var TARGET_CONFIG_FILE = 'config/env/local.js';

module.exports = function (grunt) {
	grunt.registerTask(
		'initLocalConfig',
		'Copy the local config file for new local environment',
		function () {
			if (!fs.existsSync(TARGET_CONFIG_FILE)) {
				fs.writeFileSync(TARGET_CONFIG_FILE, fs.readFileSync(EXAMPLE_CONFIG_FILE));
				grunt.log.writeln('No local config found, copied', EXAMPLE_CONFIG_FILE.cyan, 'to', TARGET_CONFIG_FILE.cyan);
			} else {
				grunt.log.writeln(TARGET_CONFIG_FILE.cyan, 'already exists.');
			}
		}
	);
};
