var scraper = require('./scraper.js');

console.log('node server here')

// run mongod in command line 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected')
});

scraper(); 