var express = require('express');
var router = express.Router();
var access = require('./database.js');

console.log("Made it into ledger");

router.post('/', function(req,res,next){
    
    //get fileID from body of the request
    var fileID = req.body.id;
    //console.log(req.body);
	
    var ip = access.getIp(fileID);
	
	console.log(ip);
    res.status(204).send(ip[0]);

});
module.exports = router;