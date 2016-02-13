var http = require('http');

var Webpage = function(host){
	this.host = host;
}

Webpage.prototype.get = function(page){
	this.page = page;
	console.log('getting page: ' + this.page);
	this.process();
}

Webpage.prototype.process = function(){	
	var that = this;
	return http.get({
        	host: this.host,
        	path: this.page,
		port: 80,
		agent: false,
		
    	}, function(response) {
        	var body = '';
        	response.on('data', function(d) {
            		body += d;
        	});
        	response.on('end', function() {
            		// Data reception is done, do whatever with it!
			console.log(body);
        	});
    	});
}

var google = new Webpage('httpbin.org');
google.get('/ip');
