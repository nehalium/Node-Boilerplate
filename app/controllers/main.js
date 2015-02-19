/**
 * main.js
 * @fileOverview Main Node Controller
 */

var url = require('url');
var conf = require('../../config/default');
var logger = require('./../logger');
var util = require('../headers');
var html = require('../html');

/**
 * Index page
 * @params req, res
 * @returns rendered ejs file
 * @memberOf exports
 */
exports.index = function(req, res) {
	var userAgent = req.headers['user-agent'];
	var browser = util.headers.getBrowser(userAgent);

	if (!browser.supported) {
		res.redirect('/unsupported_browser');
	} else {
		res.render('index', {
			google : conf.config.google,
			title : conf.config.title,
			env : conf.config.env
		});
	}
};

/**
 * Load the 404 page
 * @params req, res
 * @returns rendered ejs file
 * @memberOf exports
 */
exports.missing = function(req, res) {
	logger.logInfoObj({
		action: 'missing',
		actionType: 'page',
		description: 'User tried to go to a missing page.  Loading 404 page.',
		pageUrl: req.url
	});
	res.status(404);
	res.render('404', {
		google : conf.config.google,
		title : conf.config.title,
		env : conf.config.env
	});
};

/**
 * Load the unsupported view
 * @params req, res
 * @returns rendered ejs file
 * @memberOf exports
 */
exports.unsupported = function(req, res) {logger.logInfoObj({
		action: 'unsupported',
		actionType: 'page',
		description: 'User is using an unsupported browser.  Loading badBrowser page.',
		userAgent: req.headers['user-agent']
	});
	res.render('badBrowser', {
		google : conf.config.google,
		title : conf.config.title,
		env : conf.config.env
	});
};
