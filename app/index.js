var log = require('./log.js');
var database = require('./database.js')

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.send('<html><body><h1>Hello World</h1></body></html>');
});
app.get('/:a?/:b?/:c?', function(req, res) {
	res.send(req.body.params.a + ' ' + req.params.b + ' ' + req.params.c);
});

app.post('/', function(req, res) {
	var action = req.body.action;
	if (action == "signup") {
		var username = req.body.username;
		var password = req.body.password;
		insertUser(username, password, function(response) {
			res.send(response);
		});
	}
});

function signUp(username, password) {
}

http.createServer(app).listen(app.get('port'), function() {
	printLog('Express server listening on port ' + app.get('port'));
});