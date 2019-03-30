const mongoose = require('mongoose');
const db = require('./connect');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
    {listing_id: String,
     customer_name: String,
     date: Date,
     body: String,
     image: String, 
     accuracy_rating: String,
     communication_rating: String,
     cleanliness_rating: String,
     location_rating: String,
     check_in_rating: String,
     value_rating: String
})

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;
