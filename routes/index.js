var express = require('express');
var router = express.Router();
const ejs = require('ejs');
const fs = require('fs');

var aNewPath = "./videos/"

const maxCount = 35;

/* GET home page. */
router.get('/', (req, res) => res.render('index.ejs'));

router.get('/stat', (req, res) => {
  const vids = fs.readdirSync(aNewPath);
  res.send({
    used: vids.length,
    total: maxCount,
    videos: vids.map((e) => e.replace(".mp4", ""))
  });
});

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

*/
module.exports = router;
