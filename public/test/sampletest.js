var assert = require('assert'),
Browser = require('zombie');
var browser = new Browser();

describe('Loads pages', function(){

    it('index loads', function(done){

        browser.visit("http://localhost/pumping", {debug: true},function () {
        	assert.ok(browser.success);
        	var field = browser.query("h2");
        	console.log(field);
            done();
        });
    });

});