var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");
const ejs = require("ejs");

//this was the simplest way
let new_id = '';
const ledger_ip = 'http://172.20.79.16';

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };

var node_ip = "";

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
        node_ip = node_ips[0];
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
    let ip = node_ip;
	console.log(req.body);
    data = {
		id: name,
        name: name,
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        ip: ip
    }

    fetch(ledger_ip + '/upload/new',
	{
		method : 'POST',
		body: data
	})
    .then(function(response) {
        console.log(response.status);
    })
})


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