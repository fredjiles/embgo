/**
 * User: Fred Jiles <fredjiles@gmail.com>
 * Date: 2/21/13
 */
var mongodb = require('mongodb');

var connect = function (dbName, callback) {
    mongodb.Db.connect("mongodb://localhost/" + dbName, function (err, database) {
        callback(database);
    });
};

var cleanName = function (database, name) {
    // get rid of dbname. part
   name = name.split(database + ".")[1];

    return name;
}
exports.collectionsForDatabase = function(dbName, callback) {
    var response = [];
    connect(dbName, function (db) {
        db.collectionNames(function (err, names) {

            var processed = names.length;
            names.forEach(function (collection) {

                // skip system.indexes collection
                if(collection.name !== dbName + '.system.indexes') {
                    collection.name = cleanName(dbName, collection.name);
                    collection.id = collection.name;
                    collection.database_id = dbName;

                    var coll = db.collection(collection.name);
                    (function(coll, collection, response){

                        coll.count(function(err, count){

                            processed -= 1;
                            collection.count = count;
                            response.push(collection);

                            if(processed === 0) {

                                callback(response);
                                db.close();
                            }
                        })
                    }(coll, collection, response));

                }else{
                    processed -= 1;
                }
            });

        });
    });
};