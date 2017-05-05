const fs = require('fs');
const printf = require('util').format;

try {
	var config = fs.readFileSync('config.json', {encoding:"utf8"});
	config = JSON.parse(config);
} catch(e) {
	console.error('Invalid or missing config.json');
	process.exit(1);
}

config.watch.forEach((dir) => {
	
	console.log('Watching and logging ' + dir);
	fs.watch(dir, {recursive: true}, (eventType, fileName) => {
		var fileUri = printf("%s/%s", dir, fileName);
		handleEvent(eventType, fileUri);
	});

});


function handleEvent(eventType, fileUri) {

	var buffer = printf("%s: %s %s\n", new Date(), eventType, fileUri);
	console.log(buffer);

	fs.appendFile(config.logFile, buffer, (err) => {
		if (err) {
			console.error(err);
		}
	});

}
