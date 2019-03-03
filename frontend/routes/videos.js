var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");
const ejs = require("ejs");

const ledger_ip = 'http://172.20.79.16';

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
    const payload = {
        id: vid_id
    }
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

//Uploads the video
router.post('/upload', (req, res) => {
    //Get the stream node's ip to upload the video to
    //Upload the video to that node
	console.log("test");
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

//displays array of ojbs that match the tag input
router.get('/search/:tag', (req, res) => {
    //let newlink;
    let objs; //array of objs
    let taginput = req.params.tag;
    const payload = {
        id: taginput
    }
    console.log("Tag input:" + taginput);
    fetch(ledger_ip + '/ledger/search/' + taginput, {
        method: 'GET'
    })
    .then(function(response) {
        return(response.json());
    })
    .then(function(myJSON) {
        objs = myJSON; //is this legal 
        console.log(objs);
        res.render('results', {items: objs}); // GET /:tag ==> { }
    });
    
})







module.exports = router;