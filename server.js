// Default to 'LOCAL' mode
process.env.NODE_ENV = process.env.NODE_ENV || 'LOCAL';

// Load NodeTime on Staging (Which we call Sandbox) and Production
if (process.env.NODE_ENV === "STAGE" || process.env.NODE_ENV === "PROD") {
	require('nodetime').profile({
		accountKey: '4e3ab8aad188a808737287f00029be881db4f6e7',
		appName: '{APP_NAME} ' + process.env.NODE_ENV
	});
} // end if

/**
 * Load our utilities, libraries, and models
 */
var express = require('express'),
	app = express(),
	http = require('http'),
	path = require('path'),
	server = http.createServer(app),

	// Load Libs
	conf = require('./config/default'),

	// Routes
	routes = {
		main: require('./app/controllers/main')
	};

/**
 * Express Configuration
 */
app.configure(function(){
	// Set App Vars
	app.set('title', conf.config.appName);
	app.set('view engine', 'ejs');
	app.disable('x-powered-by');
	app.enable('trust proxy');
	app.set('config', conf.config);

	// Enable JSONP
	app.enable("jsonp callback");

	// Compress static files
	app.use(express.compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Public Directory
	app.use('/public', express.static(__dirname + '/public'));
	app.use('/src', express.static(__dirname + '/src'));

	// View Directory
	app.set('views', __dirname + '/app/views');
	
	// Favicon File
	app.use(express.favicon(path.join(__dirname, 'public/img/favicon.png')));
	
	// Cookies
	app.use(express.cookieParser(app.get('config').cookieKey));
	
	// Body parsing 
	//app.use(express.bodyParser());
	app.use(express.urlencoded());
	app.use(express.json());
	app.use(express.methodOverride());
	app.use(app.router);

	// Error Handling
	if(conf.config.env === "localenv") {
		app.use(express.errorHandler());
	} // end if
	else {
		app.use(function (err, req, res) {
			if ("stack" in err) {
				console.error(err.stack);
			}
			res.status(500);
			if ("message" in err) {
				res.send({ exception: { message: err.message } });
			}
			else {
				res.send({ exception: { message: "Unspecified error" } });
			}
		});
	}
});

/**
 * Routes
 */

// P3P Header, which prevents GA cookie from being blocked in IE, assets placed in src/w3c
app.all('*', function (req, res, next) {
	res.setHeader('P3P', 'policyref="' + conf.config.url + '/public/w3c/p3p.xml",CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');
	next();
});

app.get('/', routes.main.index);
app.get('*', routes.main.missing);

// Expose app instance
module.exports = app;

// Load view helpers
require('./app-locals');

/**
 * Activate the server
 */
server.listen(app.get('config').port);
console.log("Server connected on port " + app.get('config').port);
