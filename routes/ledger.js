var express = require('express');
var router = express.Router();
var access = require('./ledger/database.js');

console.log("Made it into ledger");

router.post('/', function(req,res,next){
    
    //get fileID from body of the request
    var fileID = req.body.id;
    console.log('FileID Recieved');

    var ip = access.getIp(fileID);

    res.send(ip);

});
module.exports = router;