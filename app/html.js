/**
 * html.js
 * @fileOverview Gets display HTML
 */

var fs = require('fs');
var path = require('path');
var logger = require('./logger');

/**
 * Gets display HTML
 * @returns HTML string
 * @memberOf exports
 */
exports.getHtml = function(countryCode) {
	var filePath = path.join(__dirname, '/views/templates/' + countryCode + '/welcomemat.html');
	return _readFile(filePath).replace(/[\n\r]/g, '');
};

/**
 * Gets display HTML in English
 * @returns HTML string
 * @memberOf exports
 */
exports.getEnglishHtml = function(countryCode) {
	var filePath = path.join(__dirname, '/views/templates/' + countryCode + '/welcomemat-ENG.html');
	return _readFile(filePath).replace(/[\n\r]/g, '');
};

/**
 * Returns the contents of a specified file.
 * @param filePath
 * @returns {*}
 * @private
 */
function _readFile(filePath) {
	return fs.readFileSync(filePath, { encoding: 'utf-8' });
}