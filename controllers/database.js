var  Db = require('mongodb').Db;

var db = null;
Db.connect("mongodb://localhost/admin", function(err, database){
    db = database;

});

/*
 * GET users listing.
 */
exports.index = function (req, res) {
    db.executeDbCommand({listDatabases: 1}, function(err, dbs){
        var out = [];
        dbs.documents[0].databases.forEach(function(database){
            out.push({name: database.name});
        });
        res.send({databases: out});
    })
};


/*
 * POST users create
 */
exports.create = function (req, res) {

    console.log(req.body);
    db.executeDbCommand({create: req.body.database.name}, function(err, database){
        console.log(database);
        res.send()
    })
};


/*
 * DELETE users delete
 */
exports.remove = function (req, res) {

    var database = db.collection((req.params.name));
    database.dropDatabase(function(err, result){
        console.log(req.param.name + " REMOVED");
    });
};