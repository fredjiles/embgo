var mongoose = require('mongoose');
var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Job = new Schema({
    address: String,
    city: String,
    state: String,
    zip: String,
    status: String,
    date: Date,
    client: String,
    pump: String,
    yards: Number,
    invoice_Total: Number
});

mongoose.model('Job', Job);