var express = require('express');
var router = express.Router();
let productModel = require('../schemas/products')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let products = await productModel.find({})
  res.send(products);
});

module.exports = router;
