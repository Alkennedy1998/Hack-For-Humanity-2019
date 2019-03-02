var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ejs = require('ejs');

let ledger_ip = 'IP GOES HERE';

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };


app.get('/videos/:id', (req, res) => {
    let vid_id = req.params.id;
    const payload = {
        id: vid_id
    }

    fetch(ledger_ip, {
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

app.post('/videos/upload')