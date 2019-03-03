var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require("fs");
const ejs = require('ejs'); //need this??

//test id: 1551569388690
router.get("")

var idNumber ="1551569388690"
var aNewPath = "./videos/" + idNumber + ".mp4"

router.get('/video/:id', function(req, res) {
    const path = `./videos/${req.params.id}.mp4` //MAKE THIS DYNAMIC -- I MADE IT DYNAMIC
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });



  module.exports = router;