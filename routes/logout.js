const express = require('express');
const router = express.Router();
const { getLogOut, postLogOut }= require('../controllers/logout');

router.post('/', postLogOut)
router.get('/', getLogOut)
//app.get('/logout', (req, res)=>{})
//쿠키, 세션 이용시 필요

module.exports = router; 