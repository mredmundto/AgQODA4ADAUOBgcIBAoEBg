'use strict';
const fivebeans = require('fivebeans');
const client = new fivebeans.client('localhost', 11300);
const job1 = require('./job.js');

client
.on('connect', function () {
	client.use('mredmundto', function (err, name) {
		client.put(0, 0, 5, JSON.stringify(['mredmundto', job1]), function (err2, jobid) {
			console.log(jobid);
		});
	});
}).on('error', function (err) {
	console.log(err);
})
.on('close', function () {
	console.log('...Closing the tube...');
})
.connect();
