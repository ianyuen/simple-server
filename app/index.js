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

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	log.print("Connected correctly to server.");
	db.close();
});

var insertDocument = function(db, callback) {
	db.collection('restaurants').insertOne( {
		"address" : {
			"street" : "2 Avenue",
			"zipcode" : "10075",
			"building" : "1480",
			"coord" : [ -73.9557413, 40.7720266 ]
		},
		"borough" : "Manhattan",
		"cuisine" : "Italian",
		"grades" : [
			{
				"date" : new Date("2014-10-01T00:00:00Z"),
				"grade" : "A",
				"score" : 11
			},
			{
				"date" : new Date("2014-01-16T00:00:00Z"),
				"grade" : "B",
				"score" : 17
			}
		],
		"name" : "Vella",
		"restaurant_id" : "41704620"
	}, function(err, result) {
		assert.equal(err, null);
		log.print("Inserted a document into the restaurants collection.");
		callback();
	});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	insertDocument(db, function() {
		db.close();
	});
});

var findRestaurants = function(db, callback) {
	var cursor =db.collection('restaurants').find( );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	findRestaurants(db, function() {
		db.close();
	});
});