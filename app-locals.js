var app = require('./server');
var assets = require('./assets');
var url = require('url');

/**
 * View helper that outputs the appropriate <script> tags depending on the
 * current app environment
 *
 * @param  {String} name The name of the desired collection of assets
 * @return {String}
 */
app.locals.scriptTags = function (name) {
	if (app.get('config').env === 'localenv') {
		var scriptTags = assets[name].map(function (url) {
			return '<script src="/' + url + '"></script>';
		});
		return scriptTags.join("\n");
	} else {
		var path = 'public/js/' + name + '.js';
		return '<script src="' + path + '"></script>';
	}
};

app.locals.cssTag = function (name) {
	var path = 'public/css/' + name + '.css';
	var url = '/' + path;

	return '<link rel="stylesheet" href="' + url +'">';
};
