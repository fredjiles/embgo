var assert = require('assert');
var request = require('request');
var should = require('should');
var exec = require('child_process').exec;


// here so we can store results to use for entire test



describe('database tests', function () {




    it('GET /api/database should return a list of databases', function (done) {
        request('http://localhost:3000/api/database', function (err, response, body) {
            // turn response string into object
            var resp = JSON.parse(body);

            response.statusCode.should.equal(200);
            resp.should.have.property('databases').with.lengthOf(0);
            done();
        })
    });


});