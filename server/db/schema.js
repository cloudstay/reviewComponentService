const mongoose = require('mongoose');
const db = require('./connect');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
    {listing_id: {type: String, text: true},
     customer_name: {type: String, text: true},
     date: Date,
     body: {type: String, text: true},
     image: {type: String, text: true},
     accuracy_rating: {type: String, text: true},
     communication_rating: {type: String, text: true},
     cleanliness_rating: {type: String, text: true},
     location_rating: {type: String, text: true},
     check_in_rating: {type: String, text: true},
     value_rating: {type: String, text: true},
})

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;
