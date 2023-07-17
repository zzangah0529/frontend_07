const bcrypt = require('bcrypt');
const saltRounds = 10;  // 암호할 자리수
const password = '12345';

//암호화
bcrypt.hash(password, 10, function(err, hash) {
    // 
    console.log(hash);

    // 복호화
    bcrypt.compare(password, hash, function(err, result) {
         console.log( result );
         // true면 login 
    });
});