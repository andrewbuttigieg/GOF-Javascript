var http = require('http');

var Webpage = (function(){
	var that = this;
	that._page = null;
	that._webClient = null;
	that._host = null;
	that._port = null;
	_request = {};
	var functions = {
		get : function(page, callback){
			if (typeof _request[page] == "undefined"){
				this._page = page;
				return this._webClient.get({
                			host: this._host,
                			path: this._page,
                			port: this._port,
                			agent: false,
        			}, function(response) {
                			var body = '';
                			response.on('data', function(d) {
                        			body += d;
                			});
                			response.on('end', function() {
                       				// Data reception is done, do whatever with it!
						that._request[page] = body;					
                       				callback(body);
                			});
        			});
			}
			else {
				console.log('this was cached');
				callback(_request[page]);
			}
		},
		init : function(webClient, host, port){
			this._webClient = webClient;
			this._host = host;
			this._port = port;
		}
	};

	return functions;

})();

var web = Webpage;
web.init(http, 'httpbin.org', 80);

web.get('/ip', 
function (data){ 
	web.get('/ip', function (data){ console.log(data)});
});
