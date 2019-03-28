const models = require('./models');

module.exports = {
    rooms: {
        get: function(req,res) {
            models.rooms.get(function(err, result) {
                if(err) {
                    console.log('Error');
                }
                res.json(result);
            })
        }
    }
}