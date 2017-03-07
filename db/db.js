var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/meanernotes');
mongoose.connection.once('open', function() {
  console.log('Connection to meanernotes DB successful.');
});
mongoose.connection.on('error', function() {
  console.log('Connection to meanernotes DB failed.');
});
var Schema = mongoose.Schema;

var notesSchema = new Schema({
  title: String,
  note: String,
  date: { type: Date, default: Date.now },
});

var Note = mongoose.model('Note', notesSchema);

module.exports = Note;
