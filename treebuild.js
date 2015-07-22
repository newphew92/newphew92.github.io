#!/usr/bin/env node

'use strict';
// chenglou code
var express = require('express');
var pg = require('pg');
var fs = require('fs');
var bodyParser = require('body-parser');
var interp = require('./interp');

var app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  res.status(500).send('Something broke!');
});
// end

var http = require('http');
console.log("huhuhu");

var server=http.createServer(function (request,response){
    response.writeHead(200,{"Content-Type": "text/plain"});
    response.end("Hello ggggg World\n");
});

http.get("http://localhost:8000/playground.html", function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});


server.listen(8080);

console.log("8000");