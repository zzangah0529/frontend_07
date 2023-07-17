const getLogOut = (req, res)=>{
    console.log( 'logout sesstion ', req.session );

    req.session.destroy((err)=>{
        console.log('sesstion destroy');
        console.log(err)
    })
    res.send({ success : true , message :'session delete'})
}
const postLogOut = (req, res)=>{
    res.clearCookie('username'); 
    res.send({ success : true })
}

module.exports = {getLogOut, postLogOut}; 
