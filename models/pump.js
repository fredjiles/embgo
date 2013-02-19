var mongoose = require('mongoose');
var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Pump = new Schema({
    name: String,
    type: String,
    size: String
});

mongoose.model('Pump', Pump);