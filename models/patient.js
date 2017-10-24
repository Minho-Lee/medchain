var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
    name: String,
    age: String,
    gender:String,
    diseases:[String],
    drugs: [String],
});

var patientModel = mongoose.model('patient', patientSchema, 'patient');

module.exports = {patientModel: patientModel};

