var url = 'mongodb://localhost:27017/WorkoutSolution';
var assert = require('assert');
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	db.close();
});

var insertDocument = function(db, username, password, callback) {
	db.collection('users').insertOne( {
		"username" : username,
		"password" : password
	}, function(err, result) {
		assert.equal(err, null);
		callback();
		console.log("Inserted " + username + " to database");
	});
};

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

module.exports = {
	insertUser: function (username, password) {
		mongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			insertDocument(db, username, password, function() {
				db.close();
			});
		});
	}
};