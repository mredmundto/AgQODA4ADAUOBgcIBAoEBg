'use strict';
const fivebeans = require('fivebeans');
const client = new fivebeans.client('localhost', 11300);
const Beanworker = require('fivebeans').worker;
const scraper = require('./scraper.js');
const job = require('./job.js');

// Create a class to handle the work load
class Handler {
	constructor(job) {
		this.job = job;
	}

	work(payload, callback) {
		let self = this;
		client.connect();
		scraper(this.job, callback);
		// fail the first time and retrying for 3 times;
		if (this.job.failCount > 0 && this.job.failCount < this.job.failLimit) {
			client.use('mredmundto', function (err, name) {
				client.put(0, 3, 60, JSON.stringify(['mredmundto', self.job]), function (err2, jobid) {});
			});
		} // not failing and keep putting that back for 10 times
		else if (this.job.failCount < this.job.failLimit && this.job.successCount < this.job.successLimit) {
			client.use('mredmundto', function (err, name) {
				client.put(0, 10, 60, JSON.stringify(['mredmundto', self.job]), function (err2, jobid) {});
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
		'exchange': new Handler(job)  // setting handlers for types
	},
	ignoreDefault: true
};
let worker = new Beanworker(options); // Instantiate a worker
worker.start(['mredmundto']); // Listen on my_tube
