'use strict';
const should = require('chai').should();
const scraper = require('./scraper.js');
const job = require('./job.js');

describe('Unit testing', () => {
	it('Testing the scraper', () => {
		scraper.should.be.a('function');
	});

	it('Testing the job', () => {
		job.should.be.a('object');
		job.should.have.ownProperty('type');
		job.should.have.ownProperty('payload');
		job.should.have.ownProperty('successCount');
		job.should.have.ownProperty('successLimit');
		job.should.have.ownProperty('failCount');
		job.should.have.ownProperty('failLimit');
	});
});
