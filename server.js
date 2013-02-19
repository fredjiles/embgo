
/**
 * Module dependencies.
 */

var cp = require('child_process');
var grunt = cp.spawn('grunt', [ 'default']);

grunt.stdout.on('data', function(data) {
    // relay output to console
    console.log("%s", data)
});

var express = require('express');
var http = require('http');
var path = require('path');

var app = module.exports = express();
var databaseController = require("./controllers/database");
var collectionController = require("./controllers/collection");

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/api/databases', databaseController.index);
app.post('/api/databases', databaseController.create);
app.delete('/api/databases/:name?', databaseController.remove);
app.get('/api/collections/:database?', collectionController.index);
app.post('/api/collections/:database?', collectionController.create);
app.delete('/api/collections/:database/:name?', collectionController.remove);

if(!module.parent) {
     http.createServer(app).listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
    });
}

