const request = require('supertest');
const app = require('../server');

describe('Test the root path', function() {
   
    test('Should output statuscode of 200 to GET request', function() {
        return request(app).get('/api/rooms').expect(200);
    })
})
