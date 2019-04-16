const db = require('./connect.js')
const Reviews = require('./schema');
const faker = require('faker');

var arr = [];

const createData = function() {

    for(var i = 100; i < 200; i++) {
        var str = i.toString();
       
        var inputs = Math.ceil(Math.random() * 20);
         
        for(var j = 0; j < inputs; j++) {
            var Review = {
                listing_id: str,
                customer_name: faker.name.firstName(),
                date: faker.date.past(),
                body: faker.lorem.paragraph(),
                image: `https://s3-us-west-1.amazonaws.com/customer-images-fec/${Math.floor(Math.random() * 53)}.jpg`, 
                accuracy_rating: Math.floor(Math.random() * 6),
                communication_rating: Math.floor(Math.random() * 6),
                cleanliness_rating: Math.floor(Math.random() * 6),
                location_rating: Math.floor(Math.random() * 6),
                check_in_rating: Math.floor(Math.random() * 6),
                value_rating: Math.floor(Math.random() * 6)
            }

            arr.push(Review);
        }
    }
}

createData();

Reviews.create(arr)
    .then(function() {
        console.log('Seeding Successful!')
        db.close();
    })
    .catch(function(err) {
        console.log('Error on seeding')
    })
    .then(function() {
        db.close();
    })



module.exports = createData;


