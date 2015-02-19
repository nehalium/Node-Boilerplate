/**
 * logger.js
 * @fileOverview Node Controller for Logging
 */
/**
 * @ngdoc Node Controllers
 * @name logger
 */

/*
 * Load required modules
 */
var moment = require('moment'),
	conf = require('../config/default');

/**
 * @memberOf logger
 *
 * @description
 * Converts given log message level and object into string.
 *
 * @param {String} level - log message level
 * @param {Object} messageObj - log message object to be converted into string
 * @returns {String} messageStr - the message string
 * @private
 */
function _getMessageStr(level, messageObj) {
	// Start log message with the timestamp and log level
	var messageStr = moment().format() + ' level=[' + level.toUpperCase() + ']';

	// Convert the message object into a string and append it
	Object.keys(messageObj).forEach(function (key) {
		var value = messageObj[key];

		//splunk needs quotes around multi-word values.
		var finalValue = ((typeof value === 'string') && (value.indexOf(' ') >= 0)) ? '"' + value + '"' : value;

		messageStr += ', ' + key + '=' + finalValue;
	});

	return messageStr;
}

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level INFO.
 *
 * @param {String} message - the log message string
 * @public
 */
exports.logInfo = function(message) {
	console.log(moment().format() + ' level=[INFO], ' + message);
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level INFO.
 *
 * @param {Object} messageObj - the log message object
 * @public
 */
exports.logInfoObj = function(messageObj) {
	var logMessage = _getMessageStr('INFO', messageObj);
	console.log(logMessage);
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level WARN.
 *
 * @param {String} message - the log message string
 * @public
 */
exports.logWarn = function(message) {
	console.log(moment().format() + ' level=[WARN], ' + message);
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level WARN.
 *
 * @param {Object} messageObj - the log message object
 * @public
 */
exports.logWarnObj = function(messageObj) {
	var logMessage = _getMessageStr('WARN', messageObj);
	console.log(logMessage);
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level ERROR.
 *
 * @param {String} message - the log message string
 * @public
 */
exports.logError = function(message) {
	var logMessage = moment().format() + ' level=[ERROR], ' + message;
	console.log(logMessage);
	console.error(logMessage);
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level ERROR.
 *
 * @param {Object} messageObj - the log message object
 * @public
 */
exports.logErrorObj = function(messageObj) {
	var logMessage = _getMessageStr('ERROR', messageObj);
	console.log(logMessage);
	console.error(logMessage);
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level DEBUG.
 *
 * @param {String} message - the log message string
 * @public
 */
exports.logDebug = function(message) {
	if (conf.config.logLevel === 'DEBUG') {
		console.log(moment().format() + ' level=[DEBUG], ' + message);
	}
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level DEBUG.
 *
 * @param {Object} messageObj - the log message object
 * @public
 */
exports.logDebugObj = function(messageObj) {
	if (conf.config.logLevel === 'DEBUG') {
		var logMessage = _getMessageStr('DEBUG', messageObj);
		console.log(logMessage);
	}
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level TRACE.
 *
 * @param {String} message - the log message string
 * @public
 */
exports.logTrace = function(message) {
	if (conf.config.logLevel === 'TRACE' || conf.config.logLevel === 'DEBUG') {
		console.log(moment().format() + " level=[TRACE], " + message);
	}
};

/**
 * @memberOf logger
 *
 * @description
 * Logs the given message at level TRACE.
 *
 * @param {Object} messageObj - the log message object
 * @public
 */
exports.logTraceObj = function(messageObj) {
	if (conf.config.logLevel === 'TRACE' || conf.config.logLevel === 'DEBUG') {
		var logMessage = _getMessageStr('TRACE', messageObj);
		console.log(logMessage);
	}
};
