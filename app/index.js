var http = require('http');
var express = require('express');
var path = require('path');

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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("we're connected!")
});

var kittySchema = mongoose.Schema({
	name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' });
console.log(silence.name);