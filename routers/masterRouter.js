const express = require('express');
const router = express.Router();

const landingRouter = require('./landingRouter');
const authRouter = require('./authRouter');
const homeRouter = require('./homeRouter');
const accountRouter = require("./accountRouter");

router.use(authRouter);
router.use(accountRouter);
router.use(homeRouter);
router.use(landingRouter);

module.exports = router;

