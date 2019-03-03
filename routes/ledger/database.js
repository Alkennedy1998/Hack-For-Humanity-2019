 var fs = require('fs'); 
 
 function parseJson(data, id){
	let jsonArr = JSON.parse(data);
	for (i = 0; i < jsonArr.length; i++){
		if(jsonArr[i].id === id)
			return jsonArr[i].ipLoc;
	}
	return -1;
 }

const access = {
	getIp: (id) => {
		const file = './data/fileData.json';
		let raw = fs.readFileSync(file);
		let ip = parseJson(raw, id);
		return ip;
	},
	upload: (id, name, tags, ip) => {
		const file = './data/fileData.json';
	}
};

module.exports = access;