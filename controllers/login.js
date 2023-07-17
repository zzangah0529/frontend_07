const fs = require('fs');
const path = require('path');
// const model = require('../model/users.json');
const  connection = require('../model/db.js');

// employees => login 해보세요. 
// db 만들어보고 ( register 만듬 )
// 데이타 베이스 넣기 : 1명 
// 로그인 

const  getEmployees = async (req, res)=>{
    let conn; 

    try{
        conn = await connection();
        const sql = 'select * from employees';
        const rows = await conn.query(sql);
        res.json( rows );
    }catch(err){
        console.log(err)
    }finally{
        if(conn){ conn.end();}
    }
}

// const getLogin = (req, res)=>{
//     console.log('getLogin : ', req.session ); // 확인
//     try{
//         const { username } = req.session; // 
//         console.log( username )
//         if( !username ){
//             res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
//         }else{
//             res.redirect('/');
//             // 쿠키가 존재하면 로그인한 상태로 index.html
//         }  
//     }catch(err){
//         console.log(err);
//         res.status(500).send({success:false, message : '내부적 오류'})
//     }
// }

const getLogin = async (req, res)=>{
    try{
        res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
    }catch(err){
        console.log(err);
        res.status(500).send({success:false, message : '내부적 오류'})
    }
}

const postLogin = async (req, res)=>{
    let conn;
    const user = req.body;
    console.log('postLogin : ', req.session); // 세션 가져오기 

    // register:put, delete, read 추가해야 함 
    if( req.session.user ){
        res.send( {success:true, message : '이미 로그인 함'});// 로그아웃 버튼 띄우기
    }
    const { user_id, user_pwd } = req.body;
    try{
        if( !user_id || !user_pwd) return  res.status(400).json({ success : false, message : '아이디 또는 비밀번호를 입력하세요. '})

        conn = await connection() ; // 
        const  sql = `select count(*)  as cnt  from users
                      where  user_id = '${user_id}' and user_pwd='${user_pwd}'`;
 
        const rows = await  conn.query(sql);
        console.log('rows.cnt : ' , rows[0].cnt); /// [ { cnt: 1n } ]

        // // 숫자와 문자열 혼합된 문자열은 숫자로 바꾸면 숫자만 리턴
        // if( Number(rows.cnt) === 1 ){
        //     res.send({ success : true, message: user_id })
        // }

        if( Number(rows[0].cnt) !== 1 ){
            return   res.json({success : false, message : '아이디 또는 비밀 번호를 확인하세요.'})
        }

        if( Number(rows.cnt) === 1 &&  !req.session.user){
            // login 된 후에 사용자 인증이 완료되었다고 쿠키를 생성 

            // session에 쿠키를 숨김
            req.session.user={
                id : 'new session',
                name : user_id,
                maxAge : 5000,
                domain:'example.com',
                expires : new Date(),
                authorized:true
            }
            console.log('postLogin2 : ', req.session); 
            res.send({ success : true , message : user_id });
        }else{
            res.send({ success : false , message : '사용자를 찾을 수 없습니다.' })
        }
    }catch(err){
        console.log(err);
        res.status(500).send({success:false, message : '내부적 오류'})
    }
}

module.exports = { getLogin, postLogin, getEmployees }

// session 숨겨서 사용 
// jwt : 암호화된 토큰 