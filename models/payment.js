var mongoose = require('mongoose');
var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Payment = new Schema({
    status: String,
    amount: Number,
    invoice_Date: Date,
    payment_Date: Date,
    check_Number: Number
});

mongoose.model('Payment', Payment);