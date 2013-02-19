var mongodb = require('mongodb');

var connect = function (dbName, callback) {
    mongodb.Db.connect("mongodb://localhost/" + dbName, function (err, database) {
        callback(database);
    });
};


/*
 * GET collections listing.
 */
exports.index = function (req, res) {
    var out = [];
    connect(req.params.database, function (db) {
        db.collectionNames(function (err, names) {
            names.forEach(function (collection) {
                console.log(collection.name);
            });
            res.send({collections:names});
            db.close();
        });
    });
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