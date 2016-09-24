var scraper = require('./scraper.js');

console.log('node server here')

// run mongod in command line 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  mongoose.Promise = global.Promise;
  console.log('mongodb are connected')
});

scraper('USD', 'GBP'); 
scraper('GBP', 'JPY'); 

// beansstalkd connected! 
var fivebeans = require('fivebeans');
// got the port from the call with your API key 
var client = new fivebeans.client('challenge.aftership.net', 11300);

client
.on('connect', function(){
	// client can now be used
	console.log('fivebeans connected');
})
.on('error', function(err){
	// connection failure
	console.log('error in fivebeans', err); 
})
.on('close', function(){
    // underlying connection has closed
    console.log('fivebeans closed');
})
.connect();