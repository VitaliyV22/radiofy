const express = require('express');
const router = express.Router();
const radioController = require("../Controllers/radioController")

router.get('/radiodata', radioController.getRadioData)


module.exports = router