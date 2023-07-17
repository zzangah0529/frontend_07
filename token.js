// token 생성 해서 암호화된 토큰으로 사용자 인증
// 2가지 
// accesstoken : 로그인 할때, 아주 짧은 시간동안만 살아 있도록 
// refreshtoken : accesstoken 갱신할 때 
// npm i jsonwebtoken

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const PORT = 3000; 
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser());

app.use(express.static('/public'));// 공유폴더 지정
app.use('/product', express.static(path.join(__dirname, 'model')));// 공유폴더 지정
app.use(express.json()); // json포맷 사용
app.use(express.urlencoded({ extended:false})); // form데이터 읽기

app.post('/login', (req, res)=>{
    const { user_id, user_pwd} = req.body; 

    const rows = fs.readFileSync(path.join(__dirname,  "model", "users.json" ));
    const users = JSON.parse(rows);

    const find = users.find( data=> data.user_id === user_id  &&  data.user_pwd === user_pwd);

    // console.log(find)
    if(!find){
        res.send({ succes : false, message : ' 사용자를 찾을 수 없습니다. '})
    }else{
        try{
            const accesstoken = jwt.sign({
                    user_id:find.user_id,
                    user_pwd : find.user_pwd
                },
                'accesstoken_password',
                {
                    expiresIn :'30s',
                    issuer:'jemicom'
                }
            );
            res.cookie("AccessToken", accesstoken, {
                secure: false, 
                httpOnly : true
            })
            const refreshtoken = jwt.sign({
                    user_id:find.user_id,
                    user_pwd : find.user_pwd
                },
                'refreshtoken_password',
                {
                    expiresIn :'24h',
                    issuer:'jemicom'
                }
            );
            
            res.cookie("RefreshToken", refreshtoken, {
                secure: false, 
                httpOnly : true
            })

            res.send({sucess: true, message :'login'}); 
        }catch(err){
            console.log(err);
            res.status(500).send({sucess: false, message :'사용자를 찾을 수 없습니다.'})
        }
    }
})

// 장바구니, index 등 
app.get('/access', async (req, res)=>{
    const token = req.cookies.AccessToken;
    const confirm = jwt.verify(token, 'accesstoken_password');
    console.log(confirm);

    const rows = await  fs.readFileSync('./model/users.json', 'utf-8');
    const users = await JSON.parse(rows);

    const find = users.find( data=>data.user_id === confirm.user_id && data.user_pwd ===  confirm.user_pwd);
    // 닉네임이나 이름, 이메일을 화면에 표시 

    //const { user_pwd, ...others } = find; 
    const { user_pwd, user_id } = find; 
    res.status(200).json({ sucess : true, message : user_id})
})

app.get('/refresh', async (req, res)=>{
    try{
        const token = req.cookies.RefreshToken;
        const confirm = jwt.verify(token, 'refreshtoken_password');
        console.log( confirm );

        const rows = await  fs.readFileSync('./model/users.json', 'utf-8');
        const users = await JSON.parse(rows);

        const find = users.find( data=>data.user_id === confirm.user_id && data.user_pwd ===  confirm.user_pwd);

        const accesstoken = jwt.sign({
                user_id : find.user_id,
                user_pwd : find.user_pwd
            },
            'accesstoken_password',
            {
                expiresIn : '30s',
                issuer : 'jemicom'
            }
        )
        res.cookie( 'AccessToken', accesstoken, {
            secure: false, 
            httpOnly : true
        })

        res.json({ success: true, message :  " acces token recreate "})
    }catch(err){
        console.log(err);
        res.status(500).json({ success: true, message : err.message })
    }
})

// index, login, cart 로그인 된 상태인지 확인하는 라우터 필요
app.get('/login/success', async (req, res)=>{
    try{
        const token = req.cookies.AccessToken;
        const confirm = jwt.verify(token, 'accesstoken_password');
        console.log( confirm );

        const rows = await  fs.readFileSync('./model/users.json', 'utf-8');
        const users = await JSON.parse(rows);

        const find = users.find( data=>data.user_id === confirm.user_id && data.user_pwd ===  confirm.user_pwd);

        res.json({ success: true, message :  find.user_id + ' access token verify' })
    }catch(err){
        console.log(err);
        res.status(500).json({ success: true, message : err.message })
    }
})

app.listen(PORT, ()=>{
    console.log('listning port ', PORT);
})