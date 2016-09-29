var fivebeans = require('fivebeans');
var client = new fivebeans.client('localhost', 11300);
var Beanworker = require('fivebeans').worker;
var scraper = require('./../server/scraper.js');
var job1 = require('./job_example.js');

// Create a class to handle the work load
class IndexHandler {

  constructor(A, B){
    this.job1 = {
      type: 'exchange',
    }; 
    this.successCount = 1;
    this.payload = {
      from:A, 
      to:B,
    }
  }
  // work function is a named function 
  // Define the work to perform and pass back a success
  work(payload, callback){

    var self = this;

    client.connect();
    
    scraper(this.payload.from,this.payload.to); 
    
    callback('success');

    if (self.successCount < 5){
      client.use('mredmundto', function(err, name){
        client.put(0,3,5, JSON.stringify(['mredmundto', self.job1]), function(err, jobid){
          if (err) {
            console.log('this is error', err); 
          }else{
            console.log('this is job ID', jobid);
            self.successCount++;       
          }
        })
      })
    }
  }
}

// Instantiate the class
var handler = new IndexHandler(job1.payload.from, job1.payload.to);


// Set options
var options = {
  id: 'worker_1', // The ID of the worker for debugging and tacking
  host: 'localhost', // The host to listen on
  port: 11300, // the port to listen on
  handlers: {
    'exchange': handler // setting handlers for types
  },
  ignoreDefault: true
};

var worker = new Beanworker(options); // Instantiate a worker
worker.start(['mredmundto']); // Listen on my_tube