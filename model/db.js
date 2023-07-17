const   mariadb = require('mariadb');

const connection = ()=>{

    const pool = mariadb.createPool({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PWD,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME,
        connectionLimit : 5
    })

    return pool;
}

module.exports = connection;
