var log = require('./log.js');

var url = 'mongodb://localhost:27017/WorkoutSolution';
var assert = require('assert');
var mongoClient = require('mongodb').MongoClient;

insertUser = function(username, password, callback) {
	mongoClient.connect(url, function(err, db) {
		db.collection("user").insertOne({
			"username" : username,
			"password" : password
		}, function (error, result) {
			callback(result);
		});
	});
}

verifyUser = function(username, password, callback) {
	mongoClient.connect(url, function(err, db) {
		var cursor = db.collection('user').find({
			"username" : username,
			"password" : password
		});

		var counter = 0;
		cursor.each(function(err, doc) {
			if (doc != null) {
				counter++;
				callback(counter);
			} else {
				callback("canResponse");
			}
		});
	});
}