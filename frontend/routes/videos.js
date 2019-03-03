var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

let ledger_ip = 'IP GOES HERE';

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };



//Gets a video
router.post('/', (req, res) => {
    let vid_id = req.body.id;
    console.log(req.body);
    const payload = {
        id: vid_id
    }

    fetch(ledger_ip + '/LedgerReq', {
        method: 'POST',
        body: payload
    })
    .then(function(response) {
        return(response.json());
    })
    .then(function(myJSON) {
        console.log(myJSON.ip);
    });
    res.render('stream');
});


//Uploads the video
router.post('/upload', (req, res) => {
    //Get the stream node's ip to upload the video to
    //Upload the video to that node
    let ip;
    
    //Should send a post request to ledger node which should update its database
    //and send me back an array of ip addresses of available nodes
    fetch(ledger_ip + '/GetAddress', {
        method: 'POST',
    })
    .then(function(response) {
        return(response.json());
    })
    .then(function(myJSON) {
        console.log(myJSON.ip);
    });
    res.render('stream');

});

module.exports = router;