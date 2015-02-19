/*
 * Localhost Configuration Object
 */
module.exports = {
	env : "localenv",
	url : "http://localhost:3000",
	port : 3000,
	title : "",
	appName : "",
	allowedDomains : "*",
	dbUrl : "",
	dbName : "",
	cookieKey : "",
	google : {
		domain : "", /*this has to be "none" for localhost. see https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced*/
		ua : ""
	},
	sessionKey : "",
	logLevel: ""
};