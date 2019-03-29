const mongoose = require('mongoose');
const faker = require('faker');
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

const createData = function() {

    for(var i = 100; i < 200; i++) {
        var str = i.toString();
       
        var inputs = Math.ceil(Math.random() * 500);
         
        for(var j = 0; j < inputs; j++) {
            var Review = new Reviews({
                listing_id: str,
                customer_name: faker.name.findName(),
                date: faker.date.past(),
                body: faker.lorem.paragraph(),
                image: `https://s3-us-west-1.amazonaws.com/customer-images-fec/${Math.floor(Math.random() * 53)}.jpg`, 
                accuracy_rating: Math.floor(Math.random() * 6),
                communication_rating: Math.floor(Math.random() * 6),
                cleanliness_rating: Math.floor(Math.random() * 6),
                location_rating: Math.floor(Math.random() * 6),
                check_in_rating: Math.floor(Math.random() * 6),
                value_rating: Math.floor(Math.random() * 6)
            })
         
            Review.save(function(err, result) {
                if(err) {
                    console.log('Error loading data')
                } else {
                    console.log('Successfully loaded data')
                }
            });
        }
    }
}

// createData();



module.exports = Reviews;