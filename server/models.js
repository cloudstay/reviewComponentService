const db = require('./db/connect');
const Reviews = require('./db/schema');

module.exports = {
    rooms: {
        get: function(params, callback) {
            Reviews.find({listing_id: params}).exec(function(err, result) {
                callback(err, result);
            })
        }
    },
    reviews: {
        get: function(params, callback) {
            Reviews.find({$and: [
                {listing_id: params[0]}, 
                {"body": {$regex: params[1]}}
            ]}).exec(function(err, result) {
                callback(err, result);
            })
        }
    }
}