var fivebeans = require('fivebeans');
var client = new fivebeans.client('localhost', 11300);
var job1 = require('./job_example.js');

client
  .on('connect', function(){
    client.use('mredmundto', function(err, name){
      client.put(0,0,5, JSON.stringify(['mredmundto', job1]), function(err, jobid){
        console.log(jobid);
      })
      //console.log('client in server', client)
    })
  }).on('error', function(err){
    console.log(err);
  })
  .on('close', function(){
    console.log('...Closing the tube...');
  })
  .connect();