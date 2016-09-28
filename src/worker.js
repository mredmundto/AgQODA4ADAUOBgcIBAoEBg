'use strict';
const fivebeans = require('fivebeans');
const client = new fivebeans.client('localhost', 11300);
const Beanworker = require('fivebeans').worker;
const scraper = require('./scraper.js');
const job = require('./job.js');

// Create a class to handle the work load
class IndexHandler {
	constructor(job) {
		this.job = job;
	}

	work(payload, callback) {

		let self = this;
		client.connect();
		scraper(this.job, callback);

		if (this.job.successCount < this.job.successLimit) {
			console.log(this.job.successCount < this.job.successLimit); 
			client.use('mredmundto', function (err, name) {
				client.put(0, 5, 60, JSON.stringify(['mredmundto', self.job]), function (err2, jobid) {
					if (err2) {
						console.log('this is error', err);
					} else {
						console.log('this is job ID', jobid);
						//self.job.successCount++;
					}
				});
			});
		}
	}
}

// Set options
let options = {
	id: '1', // The ID of the worker for debugging and tacking
	host: 'localhost', // The host to listen on
	port: 11300, // the port to listen on
	handlers: {
		'exchange': new IndexHandler(job)  // setting handlers for types
	},
	ignoreDefault: true
};

let worker = new Beanworker(options); // Instantiate a worker
worker.start(['mredmundto']); // Listen on my_tube
