var express = require('express');
var router = express.Router();
var access = require('./database.js');

console.log("Made it into ledger");

router.post('/AddNode', function(req,res,next){
    //need to get the IP from new SN host, which should have sent in request
    var SN_IP = req.body;
    //response will recieve IP and add to each ledger IP array

    console.log(req.body);

    if(access.updateStorageNode(SN_IP, 0) !== -1)
        res.status(204).send();
    else
        res.status(404).send();

});


router.post('/', function(req,res,next){
    
    //get fileID from body of the request
    var fileID = req.body.id;
    //console.log(req.body);
	
    var ip = access.getIp(fileID);
    
	//console.log(ip);
    res.status(204).send(ip);

});
module.exports = router;