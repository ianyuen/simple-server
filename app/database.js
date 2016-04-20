var log = require('./log.js');

var url = 'mongodb://localhost:27017/WorkoutSolution';
var assert = require('assert');
var mongoClient = require('mongodb').MongoClient;

var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( { "borough": "Manhattan" } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

insertUser = function(username, password, callback) {
	var response = "";
	mongoClient.connect(url, function(err, db) {
		db.collection("user").insertOne({
			"username" : username,
			"password" : password
		}, function (error, result) {
			printLog("result: " + result);
			callback(result);
		});
	});
}