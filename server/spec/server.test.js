const express = require('express');
const request = require('supertest');

const mongoose = require('mongoose');
const Reviews = require('../db/schema')

describe('Test the root path', function() {
    var app = express();
    var server;

    beforeAll(function() {
        server = app.listen(4004);
    });

    afterAll(async function() {
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

describe('Test filtering database by listing_id', function() {
    var dbURL = 'mongodb://localhost:27017/rooms';

    beforeAll(function() {
        mongoose.connect(dbURL);
    })

    afterAll(function() {
        mongoose.disconnect();
    })

    test('Should only output documents with given listing_id', function(done) {
        var params = 171;

        Reviews.findOne({listing_id: params}).exec(function(err, result) {
            if(err) {
                done(err)
            }
            expect(result).toBeDefined();
            done();
        });
    });

    test('Should not output documents when given listing_id out of range', function(done) {
        var params = 300;

        Reviews.findOne({listing_id: params}).exec(function(err, result) {
            if(err) {
                done(err)
            }
            expect(result).toBeNull();
            done();
        });
    });
});

// describe('Test filtering database by word in body', function() {

//     test('', function(done) {
//         done();
//     });

//     test('', function(done) {
//         done();
//     });
// });
