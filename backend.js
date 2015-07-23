var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
var fs = require('fs')
var session = require ('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var admin = express.Router();

app.use(express.static("./"))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
	res.status(500).send('Something broke');
});
app.listen(8080, function () {console.log('App listening');});
app.use ('/admin', admin)
admin.use(express.static("./"))

app.get('/', function (req,res){
	fs.readFile('index.html', 'utf8', function (err, text){
		res.send(text);
	});
});

app.get('/login', function (req,res){
	fs.readFile('login.html', 'utf8', function (err, text){
		res.send(text);
	});
});


app.get('*', function (req,res){
	fs.readFile('index.html', 'utf8', function (err, text){
		res.send(text);
	});
});

// app.get('/playground')

// app.get('profile')