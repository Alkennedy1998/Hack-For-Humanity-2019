var express = require('express');
var fetch = require('node-fetch');
var ejs = require('ejs')
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//app.use(express.static(path.join(__dirname, '/public')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/stylesheets',express.static(path.join(__dirname, 'public/stylesheets')));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

var videosRouter = require('./routes/videos');

app.use('/videos',videosRouter);

app.get('/', (req, res) => {
    res.render('index'); //used to be index
});

app.get('/nodeips', (req, res) => {
    let node_ips = [];

    fetch(ledger_ip + '/uploader/getips', {
        method: 'GET'
    })
    .then(function(response) {
        return(response.json());
    })
    .then(function(myJSON) {
        node_ips = myJSON.ips;
    })

    res.send(node_ips);

})

let port = process.env.PORT;
if(port == null || port == ""){
    port = 80;
}

app.listen(port, () => console.log(`Website listening  on port ${port}!`))
