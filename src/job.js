'use strict';
const job = {
	type: 'exchange',
	payload: {
		from: 'USD',
		to: 'HKD'
	},
	successCount: 0,
	successLimit: 3,
	failCount: 0,
	failLimit: 2
};

module.exports = job;
