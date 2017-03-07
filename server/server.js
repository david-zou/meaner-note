var express = require('express');
var mongoose = require('mongoose');
var db = require('../db/db.js')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());
 
app.use(express.static(__dirname + '/../client'));

app.get('/notes/get', function() {
  console.log('Notes/get successful.');
});

app.listen(9001, function() {
  console.log('Connection to server established');
});

module.exports = app;