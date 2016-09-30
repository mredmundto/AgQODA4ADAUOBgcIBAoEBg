//'use strict';
const co = require('co');
const bluebird = require('bluebird');
const fivebeans = bluebird.promisifyAll(require('fivebeans'));
const client = new fivebeans.client('localhost', 11300);
const job = require('./job.js');


client.on('connect', function () {
	client.use('mredmundto', function (err, name) {
		client.put(0, 0, 5, JSON.stringify(['mredmundto', job]), function (err2, jobid) {
			console.log('this is seeding the job', jobid);
		});
	});
})
.connect();
