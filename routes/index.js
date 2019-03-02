var express = require('express');
var router = express.Router();
const ejs = require('ejs');


/* GET home page. */


router.get('/', (req, res) => res.render('index.ejs'));

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

*/
module.exports = router;
