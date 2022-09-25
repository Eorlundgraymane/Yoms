const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.post("/pay", accountController.pay);
router.post("/getAccount", accountController.getAccount);
router.post("/openAccount", accountController.openAccount);

module.exports = router;
