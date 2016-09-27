'use strict';
const fivebeans = require('fivebeans');
const client = new fivebeans.client('localhost', 11300);
const Beanworker = require('fivebeans').worker;
const scraper = require('./scraper.js');
const job1 = require('./job.js');

// Create a class to handle the work load
class IndexHandler {
	constructor(fromExRate, toExRate) {
		this.job1 = {
			type: 'exchange'
		};
		this.successCount = 1;
		this.failCount = 0;
		this.payload = {
			from: fromExRate,
			to: toExRate
		};
	}
  // work function is a named function
  // Define the work to perform and pass back a success
	work(payload, callback) {
		let self = this;
		client.connect();
		scraper(this.payload.from, this.payload.to);
		callback('success');
		if (self.successCount < 10) {
			client.use('mredmundto', function (err, name) {
				client.put(0, 5, 60, JSON.stringify(['mredmundto', self.job1]), function (err2, jobid) {
					if (err2) {
						console.log('this is error', err);
					} else {
						console.log('this is job ID', jobid);
						//client.bury(jobid, 0, function(err) {});
						self.successCount++;
					}
				});
			});
		}
	}
}

// Instantiate the class
let handler = new IndexHandler(job1.payload.from, job1.payload.to);

// Set options
let options = {
	id: 'worker_1', // The ID of the worker for debugging and tacking
	host: 'localhost', // The host to listen on
	port: 11300, // the port to listen on
	handlers: {
		'exchange': handler // setting handlers for types
	},
	ignoreDefault: true
};

let worker = new Beanworker(options); // Instantiate a worker
worker.start(['mredmundto']); // Listen on my_tube
