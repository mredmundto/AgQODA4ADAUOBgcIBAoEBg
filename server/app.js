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
//scraper('GBP', 'JPY'); 

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

var job1 = {
	type: 'j_type', 
	payload: {
		name: 'Edmund'
	}
}

var tube = 'mredmundto'
client.use(tube, function(err, tubename) {
	//priority (smaller more important), delay, ttr allowed time to run the job, payload 
	client.put(0,0,60, JSON.stringify(['mredmundto', job1]), function(err, jobid){
		console.log('this is the jobid', jobid); 
	});
});

client.list_tube_used(function(err, tubename) {
	console.log('tubename is', tubename); 
});




var Beanworker = require('fivebeans').worker;

class IndexHandler {
  constructor(){
    this.type = "j_type"; // Specify the type of job for this class to work on
  }
  // Define the work to perform and pass back a success
  work(payload, callback){
    console.log(payload);
    callback('success');
  }
}
// Instantiate the class
var handler = new IndexHandler();


var options = {
  id: 'worker_1', // The ID of the worker for debugging and tacking
  host: 'challenge.aftership.net', // The host to listen on
  port: 11300, // the port to listen on
  handlers: {
    'type': 'j_type' // setting handlers for types
  },
  ignoreDefault: true
};

var worker = new Beanworker(options); 
worker.start(['mredmundto']);




