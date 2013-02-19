var mongoose = require('mongoose');
var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var User = new Schema({
    first_name: String,
    last_name: String,
    login: String,
    employee_id: String,
    password: String
});

mongoose.model('User', User);