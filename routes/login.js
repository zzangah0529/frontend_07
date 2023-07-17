const express = require('express');
const router = express.Router();
const { getLogin, postLogin, getEmployees } = require('../controllers/login');

// 로그인 화면
router.get('/', getLogin)
router.get('/employees', getEmployees);
//localhost:3500/login/employees

// 로그인 버튼 클릭시
// DB에 id, pwd 존재하면 로그인, err
router.post('/', postLogin)

module.exports = router; 
