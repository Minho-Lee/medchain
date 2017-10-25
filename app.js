'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cfenv = require('cfenv');

var mongoose = require('mongoose');

var models = require('./models/models.js');
var Patient = models.patientModel;
var Doctor = models.doctorModel;

mongoose.connect('mongodb://sssaini1:sssaini1@ds231725.mlab.com:31725/medical-chain');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', "x-requested-with");
    // res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('main.ejs');
});

app.get('/patient-main', function(req, res) {
    res.render('patient-main.ejs')
})

app.post('/patient-info', function(req, res) {
    console.log("the patient I am looking for in the db: " + req.body.name);

    Patient.find({
        "name": req.body.name
    }, function(err, doc) {
        console.log(doc);
        res.render('patient-info.ejs', {
            doc: doc
        });
    });
});

app.post('/doctor-main', function(req, res) {

    var options = {
        safe: true,
        upsert: true
    };

    var update = {
        $push: {
            diseases: [req.body.disease1, req.body.disease2]
        }
    };


    Patient.findOneAndUpdate({
        "name": req.body.name
    }, update, options, function(err, doc) {
        if (err) {
            console.log('got an error ' + err);
        } else {
            console.log('saved');
        }

    });

    var query = Patient.findOne({
        "name": req.body.name
    }, {}, function(err, doc) {
        if (err) {
            console.log('got an error ' + err);
        }
    })


    query.then(function(doc) {
        console.log("patient found to add to doctor: " + doc);

        var update2 = {
            $push: {
                patients: doc
            }
        };


        var query2 = Doctor.findOneAndUpdate({
            "name": req.body.doctor
        }, update2, options, function(err, doc) {
            if (err) {
                console.log('got an error ' + err);
            } else {
                console.log('saved');

                res.render('doctor-info.ejs', {
                    doc: doc
                });
            }

        });

        query2.then(function(doc) {
            console.log("query 2 sAYS" + doc)
        });


    });


});

app.get('/pharmacist', function(req, res) {
    res.render('pharmacist.ejs');
})

var appEnv = cfenv.getAppEnv();
// console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});