var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ejs = require('ejs');


const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './videos',
  /*
  filename: function(req, file, cb){
    cb(null,'image.png')
  }
  */
  
  filename: function(req, file, cb){
    cb(null,/*file.fieldname + '-' + */Date.now() + path.extname(file.originalname));
  }
  
});

// Init Upload
//MAKE THIS WORK WITH mp4/videos
const upload = multer({
  storage: storage,
  limits:{fileSize: 90000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myVideo');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|mp4|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


//KEEP THIS
router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.send(err)
    } 
    else {
      if(req.file == undefined){
        res.send("No file selected");
      } 
      else {
        res.render('index');
       }
    }
  });
});



module.exports = router;
