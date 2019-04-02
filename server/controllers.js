const models = require('./models');

module.exports = {
    rooms: {
        get: function(req,res) {
            var params = req.query.id;
       
            models.rooms.get(params, function(err, result) {
                if(err) {
                    console.log('Error');
                }
                res.json(result);
            })
        }
    },
    reviews: {
        get: function(req, res) {
            var params = [req.query.id, req.query.search];

            models.reviews.get(params, function(err, result) {
                if(err) {
                    console.log('Error');
                }
                res.json(result);
            })
        }
    }
}

// var typeA = [true, false]

// typeA[Math.floor(Math.random() * 2)]