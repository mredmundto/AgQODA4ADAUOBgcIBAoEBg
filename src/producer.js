'use strict';
const fivebeans = require('fivebeans');
const client = new fivebeans.client('localhost', 11300);
const job = require('./job.js');

client
.on('connect', function () {
	client.use('mredmundto', function (err, name) {
		// seeding the first job upon connection
		client.put(0, 0, 5, JSON.stringify(['mredmundto', job]), function (err2, jobid) {
			console.log('this is seeding the job', jobid);
		});
	});
}).on('error', function (err) {
	console.log(err);
})
.on('close', function () {
	console.log('...Closing the tube...');
})
.connect();
