const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");

router.get("/home",homeController.getHomePage);

module.exports = router;
