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
var Pharmacist = models.pharmacistModel;

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

app.get('/testing', function(req, res) {
    res.render('testing.ejs');
})

app.get('/', function(req, res) {

    //Setting the original docs
    /*
        var p1 = new Patient({ name: 'sssaini', age: 10, gender: "M", diseases: [], drugs: [] });

        p1.save(function(err) {
            if (err) {
                console.log(err);
            }

            var d1 = new Doctor({
                name: '1',
                age: 20,
                gender: "F",
            });

            d1.patients.push(p1._id);

            d1.save(function(err) {
                if (err) {
                    console.log(err);
                }

                var pharma1 = new Pharmacist({ name: "pharmacist", customers: [] });
                pharma1.customers.push({ patient: p1._id, doctor: d1._id });
                pharma1.save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        });
    */

    res.render('patient-main.ejs');
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
                patients: doc._id
            }
        };


        var query2 = Doctor.findOneAndUpdate({
            "name": req.body.doctor
        }, update2, options, function(err, doc) {
            if (err) {
                console.log('got an error ' + err);
            } else {
                console.log('saved');

                res.render('doctor-main.ejs', {
                    doc: doc
                });
            }

        });

    });


});

app.post('/doctor-info', function(req, res) {
    console.log("the patient I am looking for in the db: " + req.body.name);


    var query = Patient.findOne({
        "name": req.body.name
    }, {}, function(err, doc) {
        if (err) {
            console.log('got an error ' + err);

        }
    })


    query.then(function(doc) {
        res.render('doctor-info.ejs', {
            doc: doc
        });
    });

});

app.post('/pharmacist-main', function(req, res) {

    console.log("doc is " + req.body.doctor);

    var query3 = Doctor.findOne({
        "name": req.body.doctor
    }, "name age patients", function(err, doc) {
        if (err) {
            console.log('got an error ' + err);
        }
    })

    query3.then(function(doc) {

        var options = {
            safe: true,
            upsert: true
        };

        console.log(doc);
        var update2 = {
            $push: {
                drugs: { $each: [req.body.drug1, req.body.drug2] }
            }
        };


        Patient.findOneAndUpdate({
            "name": req.body.name
        }, update2, options, function(err, doc) {
            if (err) {
                console.log('got an error ' + err);
            } else {
                console.log('saved');
            }

        });


        var options = {
            safe: true,
            new: true
        };

        var update2 = {
            $push: {
                customers: { patient: doc.patients[0], doctor: doc._id }
            }
        };

        Pharmacist.findOneAndUpdate({
            "name": req.body.pharmacist
        }, update2, options, function(err, doc) {
            if (err) {
                console.log('got an error ' + err);
            } else {
                console.log('saved');

                console.log("namw: " + doc.customers[0].patient);

                var query4 = Patient.findById(
                    doc.customers[0].patient,
                    function(err, doc3) {
                        if (err) {
                            console.log('got an error ' + err);
                        }

                        var patient = doc3;

                        // console.log("the patient drug array is: "+ patient)
                        var num_of_drugs = patient.drugs.length
                        for (var i = 0; i < num_of_drugs; i++) {
                            for (var j = i + 1; j < num_of_drugs; j++) {
                                if (patient.drugs[i] === patient.drugs[j]) {
                                    console.log('i: ' + i + '/patient drugs: ' + patient.drugs[i]);
                                    patient.drugs.splice(i, 1);
                                }

                            }
                        }

                        doc3.drugs = patient.drugs;
                        doc3.save(function(err, doc) {
                            if (err) return handleError(err);
                        });

                    });

                query4.then(function(doc3) {

                    res.render('pharmacist-main.ejs', {
                        doc: doc,
                        patient: doc3
                    });


                });

            };
        });
    });
});

var appEnv = cfenv.getAppEnv();
// console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});