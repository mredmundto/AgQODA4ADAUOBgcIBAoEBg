var fivebeans = require('fivebeans');
var client = new fivebeans.client('localhost', 11300);
var Beanworker = require('fivebeans').worker;

var job1 = {
  type: 'j_type',
  payload: {
    A: 1,
    B: 2
  }
};

// Create a class to handle the work load
class IndexHandler {
  constructor(){
    this.type = "j_type"; // Specify the type of job for this class to work on
  }
  // Define the work to perform and pass back a success
  work(payload, callback){
    console.log(payload.A + payload.B);
    //console.log('client in worker', client.put); 
    callback();
    client.connect(); 
    client.use('mredmundto', function(err, name){
      client.put(0,10,5, JSON.stringify(['mredmundto', job1]), function(err, jobid){
        console.log('this is job ID', jobid);
      })
    })

  }
}
// Instantiate the class
var handler = new IndexHandler();

// Set options
var options = {
  id: 'worker_1', // The ID of the worker for debugging and tacking
  host: 'localhost', // The host to listen on
  port: 11300, // the port to listen on
  handlers: {
    'j_type': handler // setting handlers for types
  },
  ignoreDefault: true
};

var worker = new Beanworker(options); // Instantiate a worker
worker.start(['mredmundto']); // Listen on my_tube