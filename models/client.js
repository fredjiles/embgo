var mongoose = require('mongoose');
var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Client = new Schema({
    company_name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    cell: String,
    fax: String
});

mongoose.model('Client', Client);