const express = require('express');
const router = express.Router();

const landingController = require('../controllers/landingController');

router.use('/', landingController.getLandingPage);

module.exports = router;