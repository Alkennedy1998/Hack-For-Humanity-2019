var express = require('express');
var router = express.Router();


console.log("Made it into ledger");
//array of submissions, each number represents ID for now
//{ID, tag, IP}
/*
var files = [
    {ID:"1",name: "1",tag:"music",descritpion: "Music Video",IP:["10"]},
    {ID:"2",name: "2",tag:"cooking",description: "Cooking Video",IP:["20,40"]},
    {ID:"3",name: "3",tag:"coding",description: "Coding Master Race Video",IP:["30,50,70"]}
];
*/

router.get('/filedata/:id', function(req,res,next){
    //get fileID from body of the request
    var fileID = req.params.id;
    console.log('FileID Recieved');
    let ip = access.getIp(fileID);
    
    /*
    //loop through the list of submissions and find ID that matches requested ID
    for(var i = 0; i<files.length; i++) {
        if(fileID == files[i].ID)
            break;
    }

    //send IP correleating to specific ID back to user
    var ip = files[i].IP;
    console.log(ip);
    */
    res.send(ip);

});
module.exports = router;