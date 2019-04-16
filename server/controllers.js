const models = require('./models');

module.exports = {
    rooms: {
        get: function(req,res) {
            var params = req.params.id;
            console.log(req)
            models.rooms.get(params, function(err, result) {
                if(err) {
                    console.log('Error');
                }
                res.send(JSON.stringify(result));
            })
        }
    },
    reviews: {
        get: function(req, res) {
            console.log("req", req.query)
            var params = [req.params.id, req.query.search];
            console.log('p', req.query)
            models.reviews.get(params, function(err, result) {
                if(err) {
                    console.log('Error');
                }
                res.send(JSON.stringify(result));
            })
        }
    }
}

// var typeA = [true, false]

// typeA[Math.floor(Math.random() * 2)]