 var fs = require('fs'); 
 
 function parseJson(data, id){
	let jsonArr = JSON.parse(data);
	//console.log(id);
	for (i = 0; i < jsonArr.length; i++){
		//console.log(jsonArr[i].id);
		if(jsonArr[i].id === id)
			return jsonArr[i].ipLoc;
	}
	return -1;
 }

const access = {
	getIp: (id) => {
		//console.log(id);
		const file = './routes/data/fileData.json';
		let raw = fs.readFileSync(file);
		let ip = parseJson(raw, id);
		return ip;
	},
	upload: (id, name, tags, ip) => {
		const file = './data/fileData.json';
	}
};

module.exports = access;