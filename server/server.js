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
  db.find({}).sort('-date').exec(function(err, data) {
    if (err) {
      console.error('Cannot get data from database:', err);
    } else {
      res.send(data);
    }
  });
});

app.post('/notes/post', function(req, res) {
  db.create(req.body, function(err, data) {
    if (err) {
      console.error('Cannot post to database:', err);
    } else {
      res.send(data);
    }
  });
});

app.put('/notes/delete', function(req, res) {
  db.findOne(req.body, function(err, found) {
            if (!found) {
              console.log('Cannot find item in database', err);
            } else {
              db.remove(found, function(err) {
                if (err) {
                  console.error('Cannot remove item in database', err);
                } else {
                  console.log('Successfully removed item from database.');
                  res.send();
                }
              });
            }
          });
});

app.listen(9001, function() {
  console.log('Connection to server established');
});

module.exports = app;