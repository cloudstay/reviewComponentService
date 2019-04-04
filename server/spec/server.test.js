const express = require('express');
const request = require('supertest');

const Reviews = require('../db/schema');

describe('Test sum of two numbers', function() {
    var sum = function(x, y) {
        return x + y;
    }

    test('Should output the sum of the two inputs', function(done) {
        expect(sum(3, 4)).toBe(7);
        expect(sum(14, 15)).toBe(29);
        done();
    });
});

describe('Test the root path', function() {
    var app = express();
    var server;

    beforeAll(function() {
        server = app.listen(4004);
    });

    afterAll(function() {
        server.close();
    });

    test('Should output status code of 200 to GET request with pararms in range of 100-200', (done) => {
        var params = 150;
        request(server).get(`/api/rooms?id=${params}`).expect(200);
        done();
        });

    test('Should output status code of 404 to GET request with params in different range', (done) => {
        var params = 250;
        request(server).get(`/api/rooms?id=${params}`).expect(404);
        done();
    });
});

describe('Test identifying the data type of Reviews Schema', function() {
    
    test('Should identify Reviews Schema as an object', function(done) {

        expect(typeof new Reviews).toBe('object');
        done();
        });
    });

describe('Test determining properties on the Reviews Schema', function() {
    
    test('Should have a property of body', function(done) {
    
        expect(new Reviews).toHaveProperty('body');
        done();
        });
    });


