var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");
const ejs = require("ejs");

const ledger_ip = 'http://172.20.97.11';
//this was the simplest way
let new_id = '';

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };



//Gets a video but uses a post request to keep the id in the body
/*router.post('/', (req, res) => {
    let ip;
    let vid_id = req.body.id;
    console.log(req.body);
    const payload = {
        id: vid_id
    }

    fetch(ledger_ip + '/ledger', {
        method: 'POST',
        body: payload
    })
    .then(function(response) {
        return(response.json());
    })
    .then(function(myJSON) {
        console.log(myJSON.ip);
        ip = myJSON.ip;
    }); 
    
});*/

router.get('/stream/:id', (req, res) => {
    let node_ip;
    let vid_id = req.params.id;
    
    console.log(vid_id);
    fetch(ledger_ip + '/ledger/' + vid_id, {
        method: 'GET'
    })
    .then(function(response) {
        return(response.json());
    })
    .then(function(myJSON) {
        //console.log(myJSON.ip);
        node_ip = myJSON.ip;
    }).then(function() {
        node_ip = 'http://'+ node_ip + '/streaming/video/' + vid_id;
        res.render('video', {ip: node_ip});
    });
})

router.get('/uploadpage', (req, res) => {
    let node_ips = [];
    //let new_id = '';

    fetch(ledger_ip + '/upload/getIps', {
        method: 'GET'
    })
    .then(function(response) {
        return(response.json());
    })
    .then(function(myJSON) {
        node_ips = myJSON.ips;
        new_id = myJSON.new_id;
    })
    .then( function() {
        const node_ip = node_ips[0];
        console.log(node_ip);
        res.render('upload',{url:'http://' + node_ip + '/upload'});
    });
});

router.get('/uploadsuccess', function(req, res){
    
})

router.post('/update', function(req, res) {
    let name = req.body.name;
    let tag1 = req.body.tag1;
    let tag2 = req.body.tag2;
    let tag3 = req.body.tag3;

    fetch(ledger_ip + '/update/new')
    .then(function(response) {
        console.log(response.status);
    })
})

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