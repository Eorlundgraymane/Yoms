const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.use("/logout", authController.logout);
router.post("/signup", authController.signUp);

module.exports = router;
