const express = require('express');
const router = express.Router();
const {
    getRegister, 
    getIdRegister, 
    getConfirm,
    postRegister, 
    delRegister, 
    delParamRegister,
    putRegister
} = require('../controllers/register')

router.get('/', getRegister )
router.get('/:id', getIdRegister)
router.get('/confirm', getConfirm)
router.post('/', postRegister)
router.delete('/', delRegister)
router.delete('/:id', delParamRegister)

// 1. 맨 뒤에 삽입되서 id 번호를 발생시킬때 중복된 번호를 발생 시킬 수 있다.
router.put('/register1', (req, res)=>{
    // 수정할 데이터를 전달 받아서 // 찾아서 // 수정 후 // 다시 저장
    const user = req.body; 
    // 수정할 수 없는 데이터 :  user_id, 이름, email, 수정할 데이터는 : user_pwd, 닉네임

    const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
    const users = JSON.parse(rows);

    const newUser = { id : find.id,  user_id : user.user_id, user_pwd : user.user_pwd ? user.user_pwd : find.user_pwd}

    const filter = users.filter( data=>data.user_id !==  user.user_id); // 삭제
    filter.push(newUser); // 새로운 데이터를 삭제 후 맨 뒤에 삽입


    fs.writeFileSync(
            path.join(__dirname,'..', 'model', 'users.json'),
            JSON.stringify(filter, null, '  '),  // filter
            "utf-8",
            err=>console.log(err)
        )
    res.send({ success: true, message : '수정하였습니다. '})
})

// 2. 맨뒤에 삽입될 가능성이 있음 
router.put('/register2', (req, res)=>{
    // 수정할 데이터를 전달 받아서 // 찾아서 // 수정 후 // 다시 저장
    const user = req.body; 
    // 수정할 수 없는 데이터 :  user_id, 이름, email, 수정할 데이터는 : user_pwd, 닉네임

    const rows = fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json'));
    const users = JSON.parse(rows);

    const find = users.find(data=>data.user_id === user.user_id );
    //if(!find)  res.send({ success: true, message : '아이디를 확인하세요. '});
    
    find.user_pwd = user.user_pwd; // 데이터 수정 

    const filter = users.filter( data=>data.user_id !==  user.user_id); // 삭제
    filter.push( find ); // 데이터 맨 아래 삽입
 
    fs.writeFileSync(
        path.join(__dirname, '..','model', 'users.json'),
        JSON.stringify(filter, null, '  '),
        "utf-8",
        err=>console.log(err)
    )
    res.send({ success: true, message : '수정하였습니다. '})
})

// 3. 원래 있던 위치에 데이터를 삽입하기 
router.put('/register', putRegister)

module.exports = router;