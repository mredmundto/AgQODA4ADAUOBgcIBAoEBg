'use strict';
const job = {
	type: 'exchange',
	payload: {
		from: 'USD',
		to: 'EUR'
	},
	successCount: 0,
	successLimit: 10,
	failCount: 0,
	failLimt: 3
};

module.exports = job;
