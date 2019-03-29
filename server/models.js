const db = require('./db/connect');
const Reviews = require('./db/schema');

module.exports = {
    rooms: {
        get: function(callback) {
            Reviews.find({}).exec(function(err, result) {
                callback(err, result);
            })
        },
        
    }
}