var conf = require('../../config/default'),
    app = require('../../server'),
    request = require ('http');


describe("<Node Routes>", function() {
    it("Should Exists", function() {
        expect(app).toBeDefined();
    });

	it("Should load the 404 page via GET /asdgadsgadsgs", function(done) {
		request.get(conf.config.url + "/asdgadsgadsgs", function(response) {
			expect(response.statusCode).toBe(404);
			done();
		});
	});		
});