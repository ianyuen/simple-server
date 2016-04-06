var url = 'mongodb://localhost:27017/WorkoutSolution';
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

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

var findRestaurants = function(db, callback) {
	var cursor =db.collection('restaurants').find( { "borough": "Manhattan" } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};