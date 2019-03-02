var express = require('express');
var app = require("./app.js")

let port = process.env.PORT;
if(port == null || port == ""){
    port = 80;
}

app.listen(port, () => console.log(`Image downloader listening on port ${port}!`))