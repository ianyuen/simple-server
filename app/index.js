var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res) {
	res.render('404', { url: req.url });
});

app.get('/', function(req, res) {
	res.send('<html><body><h1>Hello World</h1></body></html>');
});
app.get('/:a?/:b?/:c?', function(req, res) {
	res.send(req.params.a + ' ' + req.params.b + ' ' + req.params.c);
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

var log = require('./log.js');
log.print("test");