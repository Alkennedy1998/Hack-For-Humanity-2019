 var fs = require('fs'); 

 const dataFile = './routes/data/fileData.json';
 //const dataFile = './data/fileData.json';
 
 //const storageFile = './routes/data/streamNodeData.json';
 const storageFile = './data/streamNodeData.json';
 
 function parseJson(data, id){
	console.log(data);
	for (i = 0; i < data.length; i++){
		if(data[i].id === id)
			return data[i].ipLoc;
	}
	return -1;
 }

const access = {
	getIp: (id) => {
		//console.log(id);
		let raw = fs.readFileSync(dataFile);
		let data = JSON.parse(raw);
		let ip = parseJson(data, id);
		for (i = 0; i < ip.length; i++){
			this.increaseVidAmount(ip[0]);
		}
		let index = Math.floor(Math.random() * ip.length());
		return ip[index];//add logic later
	},
	upload: (id, name, tags, ip) => {
		let raw = fs.readFileSync(dataFile);
		let json = JSON.parse(raw);
		//console.log(json);
		let newObj = {
			id: id,
			name: name,
			tags: tags,
			ipLoc: ip
			};
		json.push(newObj);
		//console.log(json);
		fs.writeFile(dataFile, JSON.stringify(json), function(err) {
			if (err) throw (err);
		});
	},
	increaseVidAmount: (ip) => {
		let raw = fs.readFileSync(storageFile);
		let storArray = JSON.parse(raw);
		for (i = 0; i<storArray.length; i++){
			if (storArray[i].ip === ip) storArray[i].numStore++;
		}
		fs.writeFile(storageFile, JSON.stringify(storArray), function(err) {
			if (err) throw (err);
		});
	},
	updateStorageNode: (ip, vidNum) => {
		let raw = fs.readFileSync(storageFile);
		let storArray = JSON.parse(raw);
		let newObj = {
			ip: ip,
			numStore: vidNum
		};
		storArray.push(newObj);
		fs.writeFile(storageFile, JSON.stringify(storArray), function(err) {
			if (err) {
				throw (err);
				return -1;
			} else {
				return 0;
			}
		});
	},
	getStorageJSON: () => {
		let raw = fs.readFileSync(storageFile);
		return JSON.parse(raw);
	}
};

module.exports = access;