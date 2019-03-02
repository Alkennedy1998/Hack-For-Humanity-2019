var express = require('express');
var fetch = require('node-fetch');
var ejs = require('ejs')
var app = express();


app.set('view engine', 'ejs');


var videosRouter = require('./routes/videos');

app.use('/videos',videosRouter);

app.get('/', (req, res) => {
    res.render('home');
});

let port = process.env.PORT;
if(port == null || port == ""){
    port = 80;
}

app.listen(port, () => console.log(`Website listening  on port ${port}!`))