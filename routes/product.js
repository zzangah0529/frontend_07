const express = require('express');
const router = express.Router();

const {
    getProduct,
    postProduct,
    delProduct,
    putProduct
} = require('../controllers/product')

router.get('/', getProduct ) 
// register 구현과 같음
router.post('/', postProduct)
router.delete('/', delProduct )
router.put('/',  putProduct)

/*
// localhost:3000/product/sub
router.get('/sub', getSubProduct ) 
// register 구현과 같음
router.post('/sub', postSubProduct)
router.delete('/sub', delSubProduct )
router.put('/sub',  putSubProduct)
*/

module.exports = router; 

