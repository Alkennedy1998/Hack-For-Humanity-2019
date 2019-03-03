 var fs = require('fs'); 
 
 const dataAddress = './routes/data/fileData.json';
 //const dataFile = './data/fileData.json';
 
 const storageAddress = './routes/data/streamNodeData.json';
 //const storageFile = './data/streamNodeData.json';
 
 var dataFile;
 var storageFile;
 
 function updateDataFile() {
	 let raw = fs.readFileSync(dataAddress);
	 dataFile = JSON.parse(raw);
 }
 
 function updateStorageFile() {
	 let raw = fs.readFileSync(storageAddress);
	 storageFile = JSON.parse(raw);
 }
 
 updateDataFile();
 updateStorageFile();
 
 function parseJson(data, id){
	//console.log(data);
	for (i = 0; i < data.length; i++){
		if(data[i].id === id)
			return data[i].ipLoc;
	}
	return -1;
 }

const access = {
	getIp: (id) => {
		//console.log(id);
		let ip = parseJson(dataFile, id);
		let index;
		try{
			index = Math.floor(Math.random() * ip.length());
		} catch (err) {
			index = 0;
		}
		let obj = {ip: ip[index]};
		return obj;//add logic later
	},
	upload: (id, name, tag1, tag2, tag3, ip) => {
		//console.log(json);
		let newObj = {
			id: id,
			name: name,
			tags: [tag1, tag2, tag3],
			ipLoc: [ip]
			};
			console.log(ip.length);
		if (Array.isArray(ip)){
			for (i = 0; i < ip.length; i++){
				for (j = 0; j < storageFile.length; j++){
					if (storageFile[j].ip === ip[i]) storageFile[j].numStore++;
				}
			}
		} else {
			for (i = 0; i < storageFile.length; i++){
				if (storageFile[i].ip === ip) storageFile[i].numStore++;
			}
		}
		dataFile.push(newObj);
		//console.log(json);
		fs.writeFileSync(dataAddress, JSON.stringify(dataFile), function(err) {
			if (err) throw (err);
		});
		fs.writeFileSync(storageAddress, JSON.stringify(storageFile), function(err) {
			if (err) throw (err);
		});
		updateStorageFile();
		updateDataFile();
	},
	updateStorageNode: (ip, vidNum) => {
		let newObj = {
			ip: ip,
			numStore: vidNum
		};
		storageFile.push(newObj);
		fs.writeFile(storageAddress, JSON.stringify(storageFile), function(err) {
			if (err) {
				throw (err);
				return -1;
			} else {
				return 0;
			}
		});
		updateStorageFile();
	},
	getStorageJSON: () => {
		return storageFile;
	},
	search: (tag) => {
		console.log(tag);
		let matches = [];
		let tempObj;
		for (i = 0; i < dataFile.length; i++){
			for (j = 0; j < dataFile[i].tags.length; j++){
				if (dataFile[i].tags[j] === tag){
					tempObj = {id: dataFile[i].id, name: dataFile[i].name};
					matches.push(tempObj);
				}
			}
		}
		return matches;
	}
};

module.exports = access;