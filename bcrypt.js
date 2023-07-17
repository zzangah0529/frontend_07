const bcrypt = require('bcrypt'); 
let userpwd = 12345;

async function passwordHandle(userpwd){
    const hashedPwd = await  bcrypt.hash(userpwd, 10); 
    const match = await  bcrypt.compare(userpwd, hashedPwd); 
    return match; 
}
// promisse : 처리 필요 
console.log(passwordHandle(userpwd));