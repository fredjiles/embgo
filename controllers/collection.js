var mongodb = require('mongodb');

var collections = require('../lib/collections');

var connect = function (dbName, callback) {
    mongodb.Db.connect("mongodb://localhost/" + dbName, function (err, database) {
        callback(database);
    });
};


function cleanNames(database, name) {

    return name;
}
/*
 * GET collections listing.
 */
exports.index = function (req, res) {
    var response = {collections: []};
    console.log(req.params.database);
    collections.collectionsForDatabase(req.params.database, function (collections) {

        collections.forEach(function(collection){

        });
        res.send(response);
    })
};



/*
 * GET collections listing.
 */
exports.show = function (req, res) {
    console.log(req.params.database);
    collections.collectionsForDatabase(req.params.database, function (collections) {
        res.send({collections: collections});
    })
};

/*
 * POST users create
 */
exports.create = function (req, res) {


    connect(req.params.database, function (db) {
        db.createCollection(req.body.collection.name, function (err, collection) {
            res.send({collection:{name:req.body.collection.name}});
        });
    });

};


/*
 * DELETE users delete
 */
exports.remove = function (req, res) {

    connect(req.params.database, function (db) {
        db.dropCollection(req.params.name, function (err, collection) {
            res.send({collection:{name:req.params.name}});
        });
    });

};