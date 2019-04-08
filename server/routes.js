const router = require('express').Router();
const controllers = require('./controllers');

// GET Request to obtain all reviews
router.get('/api', controllers.rooms.get)

// GET Request to obtain filtered reviews
router.get('/reviews', controllers.reviews.get)

module.exports = router;