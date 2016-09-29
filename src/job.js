'use strict';
const job = {
	type: 'exchange',
	payload: {
		from: 'USD',
		to: 'HKD'
	},
	successCount: 0,
	successLimit: 10,
	failCount: 0,
	failLimit: 3
};

module.exports = job;
