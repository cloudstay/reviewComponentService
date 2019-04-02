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
            
            console.log(params[0], params[1])
            Reviews.find({$and: [
                {listing_id: params[0]}, 
                {$text: {$search: console.log(params[1])}}
            ]}).lean().exec(function(err, result) {
                console.log(result)
                callback(err, result);
            })
        }
    }
}