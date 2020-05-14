// importing express 
const express = require('express');
const router = express.Router()

const { testMe } = require('../controllers/user');
 
// creating a method
router.get("/", testMe);
 

module.exports = router;