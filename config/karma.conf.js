var def = require('../config/default');
var assets = require('../assets');

var files = [].concat(
	assets.vendor,
	assets.app
);


module.exports = function (config) {
	config.set({
		basePath : '../',
		proxies: {
			'/': def.config.url + '/'
		},
		urlRoot: '/__karma/',
		frameworks : ['jasmine'],
		reporters : ['progress','junit','coverage'],
		browsers : ['PhantomJS'],
		autoWatch : false,
		captureTimeout : 5000,
		colors : true,
		files : files,

		// Plugin configs
		junitReporter: {
			outputFile: 'logs/TEST-AngularUnitTests.xml',
			suite: ''
		},
		preprocessors: {
		},
		coverageReporter: {
			type : 'html',
			dir : 'logs/',
			file : 'coverage.html'
		},
		ngHtml2JsPreprocessor: {
			prependPrefix: '/',
			stripPrefix: 'public'
		}
	});
};
