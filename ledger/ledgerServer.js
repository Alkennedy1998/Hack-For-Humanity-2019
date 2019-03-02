const express = require('express')
const access = require('./ledger.js')
const app = express()
const port = 3000

app.get('/test', (req, res) => {
	console.log("Get received");
	res.send(req.params.name)
});

access.retrieve('name');	

app.listen(port, () => console.log(`Example app listening on port ${port}!`))