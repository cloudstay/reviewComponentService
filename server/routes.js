const router = require('express').Router();
const controllers = require('./controllers');

// GET Request to obtain all reviews
router.get('/rooms', controllers.rooms.get)

module.exports = router;