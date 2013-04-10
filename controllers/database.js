var  Db = require('mongodb').Db;
var collections = require('../lib/collections');

var db = null;
Db.connect("mongodb://localhost/admin", function(err, database){
    db = database;

});


/*
 * GET database listing.
 */
exports.index = function (req, res) {
    db.executeDbCommand({listDatabases: 1}, function(err, dbs){
        var out = [];
        var count = dbs.documents[0].databases.length;
        dbs.documents[0].databases.forEach(function(database){
            if(database.name !== 'undefined' && database.name !== 'local' && database.empty === false){

                collections.collectionsForDatabase(database.name, function(cols){
                    out.push({name: database.name, collections: cols});
                    count -= 1;

                    if(count === 0) {
                        res.send({databases: out});
                    }
                })
            }else{
                count -= 1;

                    if(count === 0) {
                        res.send({databases: out});
                    }
            }
        });
    })
};



/*
 * GET read
 */
exports.read = function (req, res) {

    collections.collectionsForDatabase(req.params.name, function(cols){
        res.send({database:{name: req.params.name, collections: cols}});
    });

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