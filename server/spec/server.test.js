const express = require('express');
const request = require('supertest');

describe('Test the root path', function() {
    var app = express();
    var server;

    beforeEach(function() {
        server = app.listen(4004)
    })

    afterEach(function() {
        server.close();
    })

    test('Should output status code of 200 to GET request with pararms in range of 100-200', function() {
        var params = 150;
        request(app).get(`/api/rooms?id=${params}`).expect(200);
    })
    test('Should output status code of 404 to GET request with params in different range', function() {
        var params = 250;
        request(app).get(`/api/rooms?id=${params}`).expect(404);
    })
})

describe('', function() {

})
