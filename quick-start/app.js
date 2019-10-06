//
// Following tutorial from:
// http://mongodb.github.io/node-mongodb-native/3.1/quick-start/quick-start/
//

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'myproject';
// Create a new MongoClient
const client = MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    // findDocuments(db, function() {
    //     client.close();
    // });                                                                                    // updateDocument(db, function() {
    //     client.close();
    // });
    // updateDocument(db, function() {
    //     removeDocument(db, function() {
    //      client.close();
    //     });
    // });
    indexCollection(db, function() {
      client.close();
    });
  });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([{a:1}, {a:2}, {a:3}], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}

const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update docuent where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }, { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({a:3}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field equal to 3");
    callback(result);
  });
}

const indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    {"a":1},
    null,
    function(err, results) {
      console.log(results);
      callback();
    }
  );
};
