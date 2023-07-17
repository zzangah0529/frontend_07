const express = require('express');
const router = express.Router();
const path = require('path');
const { getIndex } = require('../controllers/root.js');

// http://localhost:3000/
router.get('/', getIndex)

module.exports = router; 