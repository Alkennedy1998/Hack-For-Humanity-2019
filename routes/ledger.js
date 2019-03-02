var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require("fs");

//array of submissions, each number represents ID for now
//{ID, tag, IP}
var files = [
    {ID:"1",name: ID,tag:"music",descritpion: "Music Video",IP:["10"]},
    {ID:"2",name: ID,tag:"cooking",description: "Cooking Video",IP:["20,40"]},
    {ID:"3",name: ID,tag:"coding",description: "Coding Master Race Video",IP:["30,50,70"]}
];

router.post('/IP', function(req,res){
    //get fileID from body of the request
    var fileID = req.body.fileID;
    console.log('FileID Recieved');

    //loop through the list of submissions and find ID that matches requested ID
    for(var i = 0; i<files.length; i++) {
        if(fileID == files[i].ID)
            break;
    }

    //send IP correleating to specific ID back to user
    var ip = files[i].IP;
    res.send(IP);

});