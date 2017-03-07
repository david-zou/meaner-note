var express = require('express');
var mongoose = require('mongoose');
var db = require('../db/db.js')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());
 
app.use(express.static(__dirname + '/../client'));

app.get('/notes/get', function(req, res) {
  db.find({}, function(err, data) {
    if (err) {
      console.error('Cannot get data from database:', err);
    } else {
      // console.log('/notes/get successful:', data);
      res.send(data);
    }
  });
});

app.post('/notes/post', function(req, res) {
  db.create(req.body, function(err, data) {
    if (err) {
      console.error('Cannot post to database:', err);
    } else {
      console.log(res);
      res.send(data);
    }
  });
});

app.listen(9001, function() {
  console.log('Connection to server established');
});

module.exports = app;