const mongoose = require('mongoose');

const db = mongoose.connection;

const dbURL = '';

mongoose.connect(dbURL, {useNewUrlParser: true});

db.on('err', function(err) {
    console.log('Connection error');
})

db.once('open', function() {
    console.log('Connection success');
})

module.exports = db;