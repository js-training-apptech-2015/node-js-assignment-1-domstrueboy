
'use strict';
var servers = ['rocky-sierra-3635.herokuapp.com',
							 'polar-waters-8630.herokuapp.com',
							 'aqueous-ocean-2864.herokuapp.com'];
// simple express server
var application_root = __dirname,
	  express = require('express'),
		https = require('https');

var app = express();

//где сохранить статическое содержимое
app.use( express.static(application_root) );

//получение списка всех тикетов
app.all( '/games/*', function( request, response ) {
	var bodyRequest = '';

	request.on('data', function(chunk){
					bodyRequest += chunk;
	});

	request.on('end', function(){
			servers.forEach(function(instance) {
					var options = {
							'host': instance,
							'port': 443,
							'path': request.url,
							'method': request.method,
							'headers': {
									'Content-Type': 'application/json'
							}
					};

					var req = https.request(options, function(res){
							var data = '';

							res.on('data', function(chunk){
									data += chunk;
							});
							res.on('end', function(){
									var send = {'server': instance, 'data': JSON.parse(data)};
									console.log(send);
									response.end(JSON.stringify(send, null, '\t'));
							});
							res.on('error', function(err){
									console.log(err);
							});
					});

					req.on('error', function(err){
							console.log(err);
					})
					if(request.method !== 'GET'){
							req.write(bodyRequest);
					}
					req.end();
			});
	})
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log('Express server listening on port %d', port)
});
