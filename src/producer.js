'use strict';
const bluebird = require('bluebird');
const job = require('./job.js');
const config = require('./config.js');
const fivebeans = bluebird.promisifyAll(require('fivebeans'));
const client = new fivebeans.client(config.beanstalkd.address, config.beanstalkd.port);

client.on('connect', function () {
	client.use(config.beanstalkd.tubename, function (err, name) {
		client.put(0, 0, 5, JSON.stringify([config.beanstalkd.tubename, job]), function (err2, jobid) {
			console.log('this is seeding the job', jobid);
		});
	});
})
.on('error', function (err) {
	console.log('Error connection from fivebeans', err);
})
.on('close', function () {
  // underlying connection has closed
})
.connect();
