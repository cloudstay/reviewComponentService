const router = require('express').Router();
const controllers = require('./controllers');

// GET Request to obtain all reviews
router.get(`/rooms/:id/reviews`, controllers.rooms.get)

// GET Request to obtain filtered reviews
router.get(`/rooms/:id/searchReviews`, controllers.reviews.get)

module.exports = router;