var express = require('express');
var fetch = require('node-fetch');
var app = express();


app.set('view engine', 'ejs');

let ledger_ip = 'IP GOES HERE';

app.get('/', (req, res) => {
    res.render('home');
});

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

let port = process.env.PORT;
if(port == null || port == ""){
    port = 80;
}

app.listen(port, () => console.log(`Website listening  on port ${port}!`))