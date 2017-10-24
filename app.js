'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cfenv = require('cfenv');


app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(function(req,res,next) {
	// res.header('Access-Control-Allow-Origin', "x-requested-with");
	// res.header("Access-Control-Allow-Headers", "*");
	next();
})

app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('main.ejs');
});

app.get('/doctor', function(req, res) {
	res.render('doctor.ejs');
});

app.get('/patient', function(req, res) {
	res.render('patient.ejs')
})

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
