const path = require('path');
const fs = require('fs');

const getRegister = (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
}

const getIdRegister = (req, res)=>{
    const {id} = req.params;  
    const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
    const users = JSON.parse(rows);

    const find = users.find(data=>data.id === Number(id) ); 
    if( find ){
        res.send({ success: true, message : find })
    }else{
        res.send({ success: true, message : "데이터를 찾을 수 없습니다." })
    }
}

const getConfirm = (req, res)=>{
    res.send("register/confirm")
}
const postRegister = (req, res)=>{
    // error 제어 제외 
    const newUser = req.body; 
    const rows =  fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json')); // 읽고
    console.log( rows )
    const users = JSON.parse(rows);
 
    //
    const find = users.find(data=>data.user_id === newUser.user_id);
    if(find){
        console.log({success: false, message : '이미 존재하는 아이디입니다.'})
        res.send({success: false, message : '이미 존재하는 아이디입니다.'})
    }else{
         
        const id = users[users.length - 1].id + 1; 
        const inputUser =  {id , ...newUser}   
        users.push( inputUser ); // 읽은 데이터이 넣기

        fs.writeFileSync(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(users, null, "  "),
            'utf-8',
            err=> console.error(err)
        )

        const res_message = {
            success : 'ok',
            message : '회원가입 완료'
        }
        res.send( res_message );
    }// if else end 
    
}

const delRegister = (req, res)=>{
        try{
            const user = req.body; 
            const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
            const users = JSON.parse(rows);
    
            const find = users.find(data=>data.user_id === user.user_id && data.user_pwd === user.user_pwd);
            if( !find ){
                res.send({ success: false, message : '사용자가 존재하지 않습니다. '})
            }else{
                const index = users.indexOf(find);
                users.splice(index, 1); // 원본 수정, 리턴은 삭제된 값
    
                fs.writeFileSync(
                    path.join(__dirname,'..', 'model', 'users.json'),
                    JSON.stringify(users, null, '  '),
                    "utf-8",
                    err=>console.log(err)
                )
                res.send({ success: true, message : '삭제하였습니다. '})
            }
        }catch(err){
            console.log(err)
        }
    }
const delParamRegister = (req, res)=>{
    try{
        const {id} = req.params; // url, body 등로 전달받은 모든 데이터는 문자열 
        // console.log('params route', id); // string
        const rows = fs.readFileSync(path.join(__dirname,'..', 'model', 'users.json'));
        const users = JSON.parse(rows);

        const find = users.find(data=>data.id === Number(id) ); /// 데이타 타입은 항상 주의
        //                              숫자      숫자(문자열)
        if( !find ){
            res.send({ success: false, message : '사용자가 존재하지 않습니다. '})
        }else{
            const index = users.indexOf(find);
            users.splice(index, 1);

            fs.writeFileSync(
                path.join(__dirname, '..', 'model', 'users.json'),
                JSON.stringify(users, null, '  '),
                "utf-8",
                err=>console.log(err)
            )
            res.send({ success: true, message : '삭제하였습니다. '})
        }
    }catch(err){
        console.log(err)
    }


}
const putRegister = (req, res)=>{
 
    const user = req.body; 
    
    const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
    const users = JSON.parse(rows);
    const find = users.find(data=>data.user_id === user.user_id );
    //if(!find)  res.send({ success: true, message : '아이디를 확인하세요. '});
    const index = users.indexOf(find);

    const newUser = {id: find.id,  user_id : user.user_id, user_pwd : user.user_pwd ? user.user_pwd : find.user_pwd}
  
    users.splice( index, 1, newUser ); //지운 위치에 새로 삽입

    fs.writeFileSync(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(users, null, '  '),
        "utf-8",
        err=>console.log(err)
    )
    res.send({ success: true, message : '수정하였습니다. '})
}



module.exports = {
    getRegister, 
    getIdRegister,
    getConfirm,
    postRegister, 
    delRegister, 
    delParamRegister,
    putRegister
}