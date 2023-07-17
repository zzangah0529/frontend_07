const fs = require('fs');
const path = require('path');
const model = require('../model/users.json');

const getIndex = (req, res)=>{
    console.log('getIndex : ', req.session ); // 확인

    if( req.session.user ){
        res.send({ success : 'login',  message : '로인된 상태'}); // 로그아웃 버튼 띄우기
    }
    // app.use() 미들웨어에 등록
    // res.cookie('brand', 'korea_it', {
    //     maxAge : 1 * 60 * 60 * 24 * 30,
    //     domain:'koreait.com',
    //     expires : new Date(),
    //     httpOnly:true,
    //     secure: true
    // })
    // console.log('getIndex : ', req.cookies ); // 확인
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
}

module.exports = { getIndex }
