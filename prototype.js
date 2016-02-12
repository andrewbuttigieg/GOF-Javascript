var https = require('https');

var Webpage = function(host){
	this.host = host;
}

Webpage.prototype.get = function(page){
	this.page = page;
	console.log('getting page: ' + this.page);
	this.process();
}

Webpage.prototype.process = function(){	
	console.log(this.host);
	console.log(this.page);

	return https.get({
        	host: this.host,
        	path: this.page,
		port: 443,
		agent: false,
		
    	}, function(response) {
        	var body = '';
        	response.on('data', function(d) {
            		body += d;
        	});
        	response.on('end', function() {
            	// Data reception is done, do whatever with it!
		console.log(body);
//            	callback({
//                	email: parsed.email,
//                	password: parsed.pass
//            	});
        	});
    	});
}

var google = new Webpage('httpbin.org');
google.get('ip');
