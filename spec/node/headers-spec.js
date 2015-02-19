var util = require('../../app/headers');
var conf = require('../../config/default');

describe('<User Agent Tests>', function() {
	it('Should be Display and OSX', function() {
		var ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36';

		var result = util.headers.setDevice(ua);
		expect(result.dvt).toEqual('display');
		expect(result.dvos).toEqual('osx');
	});

	it('Should be Display and Windows', function() {
		var ua = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20120427 Firefox/15.0a1';

		var result = util.headers.setDevice(ua);
		expect(result.dvt).toEqual('display');
		expect(result.dvos).toEqual('windows');
	});

	it('Should be Display and Linux', function() {
		var ua = 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.19) Gecko/20081216 Ubuntu/8.04 (hardy) Firefox/2.0.0.19';

		var result = util.headers.setDevice(ua);
		expect(result.dvt).toEqual('display');
		expect(result.dvos).toEqual('linux');
	});

	it('Should be Tablet and iOS', function() {
		var ua = 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10';

		var result = util.headers.setDevice(ua);
		expect(result.dvt).toEqual('tablet');
		expect(result.dvos).toEqual('ios');
	});

	it('Should be phone and iOS', function() {
		var ua = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5';

		var result = util.headers.setDevice(ua);
		expect(result.dvt).toEqual('phone');
		expect(result.dvos).toEqual('ios');
	});

	it('Should be tablet and android', function() {
		var ua = 'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19';

		var result = util.headers.setDevice(ua);
		expect(result.dvt).toEqual('tablet');
		expect(result.dvos).toEqual('android');
	});

	it('Should be phone and android', function() {
		var ua = 'Mozilla/5.0 (Linux; U; Android 2.1-update1; de-de; HTC Desire 1.19.161.5 Build/ERE27) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17';

		var result = util.headers.setDevice(ua);
		expect(result.dvt).toEqual('phone');
		expect(result.dvos).toEqual('android');
	});

	it('Should be phone and windows', function() {
		var ua = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; NOKIA; Lumia 800)';

		var result = util.headers.setDevice(ua);
		expect(result.dvt).toEqual('phone');
		expect(result.dvos).toEqual('windows');
	});
});



describe('<Mobile vs Tablet/Display>', function() {
	it('Should be mobile', function() {
		var ua = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; NOKIA; Lumia 800)';

		var result = util.headers.isMobile(ua);
		expect(result).toBe(true);
	});

	it('Should not be mobile', function() {
		var ua = 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10';

		var result = util.headers.isMobile(ua);
		expect(result).toBe(false);
	});
});

describe('<Operating System Parsing>', function() {
	it('Should be iOS', function() {
		var ua = 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10';

		var result = util.headers.getOs(ua);
		expect(result).toEqual('ios');
	});

	it('Should be windows', function() {
		var ua = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; NOKIA; Lumia 800)';

		var result = util.headers.getOs(ua);
		expect(result).toEqual('windows');
	});

	it('Should be linux', function() {
		var ua = 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.19) Gecko/20081216 Ubuntu/8.04 (hardy) Firefox/2.0.0.19';

		var result = util.headers.getOs(ua);
		expect(result).toEqual('linux');
	});

	it('Should be android', function() {
		var ua = 'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19';

		var result = util.headers.getOs(ua);
		expect(result).toEqual('android');
	});

	it('Should be blackberry', function() {
		var ua = 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+';

		var result = util.headers.getOs(ua);
		expect(result).toEqual('bb');
	});
});

describe('<Browser Support>', function() {
	it('Should support IE11', function() {
		var ua = 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; rv:11.0) like Gecko';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('mozilla');
		expect(result.version).toEqual(11);
		expect(result.msie).toEqual(true);
		expect(result.supported).toEqual(true);
	});

	it('Should support IE10', function() {
		var ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('msie');
		expect(result.version).toEqual(10);
		expect(result.msie).toEqual(true);
		expect(result.supported).toEqual(true);
	});
	it('Should support IE10 in compatibility mode', function() {
		var ua = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/6.0)';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('msie');
		expect(result.version).toEqual(7);
		expect(result.msie).toEqual(true);
		expect(result.supported).toEqual(true);
	});
	it('Should support IE9', function() {
		var ua = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('msie');
		expect(result.version).toEqual(9);
		expect(result.msie).toEqual(true);
		expect(result.supported).toEqual(true);
	});
	it('Should support IE9 in compatibility mode', function() {
		var ua = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/5.0)';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('msie');
		expect(result.version).toEqual(7);
		expect(result.msie).toEqual(true);
		expect(result.supported).toEqual(true);
	});

	it('Should support IE8', function() {
		var ua = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('msie');
		expect(result.version).toEqual(8);
		expect(result.msie).toEqual(true);
		expect(result.supported).toEqual(true);
	});
	it('Should support IE8 in compatibility mode', function() {
		var ua = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0)';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('msie');
		expect(result.version).toEqual(7);
		expect(result.msie).toEqual(true);
		expect(result.supported).toEqual(true);
	});

	it('Should support Chrome 32', function() {
		var ua = 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('chrome');
		expect(result.version).toEqual(32);
		expect(result.msie).toEqual(false);
		expect(result.supported).toEqual(true);
	});

	it('Should support Firefox 14', function() {
		var ua = 'Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20120405 Firefox/14.0a1';
		var result = util.headers.getBrowser(ua);

		expect(result.name).toEqual('mozilla');
		expect(result.version).toEqual(14);
		expect(result.msie).toEqual(false);
		expect(result.supported).toEqual(true);
	});

	it('Should NOT support IE7', function() {
		var ua = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('msie');
		expect(result.version).toEqual(7);
		expect(result.msie).toEqual(true);
		expect(result.supported).toEqual(false);
	});

	it('Should NOT support Chrome 20', function() {
		var ua = 'Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('chrome');
		expect(result.version).toEqual(20);
		expect(result.msie).toEqual(false);
		expect(result.supported).toEqual(false);
	});


	it('Should NOT support Firefox 12', function() {
		var ua = 'Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20120403211507 Firefox/12.0';

		var result = util.headers.getBrowser(ua);
		expect(result.name).toEqual('mozilla');
		expect(result.version).toEqual(12);
		expect(result.msie).toEqual(false);
		expect(result.supported).toEqual(false);
	});
});
