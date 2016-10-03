'use strict';
const scraper = require('./scraper.js');
const job = require('./job.js');
const config = require('./config.js');
const fivebeans = require('fivebeans');
const client = new fivebeans.client(config.beanstalkd.address, config.beanstalkd.port);
const Beanworker = require('fivebeans').worker;
const co = require('co');

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
			client.use(config.beanstalkd.tubename, function (err, name) {
				client.put(0, 3, 60, JSON.stringify([config.beanstalkd.tubename, self.job]), function (err2, jobid) {});
			});
		} // not failing and keep putting that back for 10 times
		else if (this.job.failCount < this.job.failLimit && this.job.successCount < this.job.successLimit) {
			client.use(config.beanstalkd.tubename, function (err, name) {
				client.put(0, 60, 60, JSON.stringify([config.beanstalkd.tubename, self.job]), function (err2, jobid) {});
			});
		}
	}
}

// Set options
let options = {
	id: '1',
	host: config.beanstalkd.address,
	port: config.beanstalkd.port,
	handlers: {
		'exchange': new Handler(job)
	},
	ignoreDefault: true
};
let worker = new Beanworker(options);
worker.start([config.beanstalkd.tubename]);
