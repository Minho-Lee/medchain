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


var doctorSchema = new Schema({
    name: String,
    age: String,
    gender:String,
    patients:[patientSchema]
});

var doctorModel = mongoose.model('doctor', doctorSchema, 'doctor');

module.exports = {patientModel: patientModel, doctorModel: doctorModel};