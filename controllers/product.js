const path = require('path');
const products = require('../model/product.json');
const fs = require('fs');

const getProduct = (req, res)=>{
    try{
        res.sendFile(path.join(__dirname, '..', 'views', 'product.html'))
    }catch(err){
        console.log(err);
        res.status(500).send({success:false, message : '내부적 오류'})
    }
}

const postProduct = (req, res)=>{
    res.send("post Product");
}
const delProduct = (req, res)=>{
    res.send("delete Product");
}
const putProduct = (req, res)=>{
    res.send("update Product");
}

module.exports = {
    getProduct,
    postProduct,
    delProduct,
    putProduct
}