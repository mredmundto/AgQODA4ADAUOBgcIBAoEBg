'use strict';
const promise = require('bluebird');
const request = promise.promisify(require('request'));
const cheerio = require('cheerio');
const Rate = require('./db.js');

const scraper = function (job, callback) {

	const fromExRate = job.payload.from;
	const toExRate = job.payload.to;
	//const url = 'http://www.xe.com';
	const url = 'http://www.xe.com/currencyconverter/convert/?Amount=1&From='+fromExRate+'&To='+toExRate;

	request(url)
	.then((html) => {
		//console.log(html.body);
		return cheerio.load(html.body);
	})
	.then(($) => {
		// grab the exchange rate and convert that to number
		let rate = Number($('td.rightCol').text().split('\n')[0].replace(/, |[A-Z]/g, '')).toFixed(2);
		if (rate === undefined) {
			throw 'we can not get the rate';
		} else {
			return rate;
		};
	})
	.then((rate) => {

		let obj = new Rate({
			'from': fromExRate,
			'to': toExRate,
			'created_at': new Date(),
			'rate': rate
		});
		obj.save(function (err) {
			if (err) {
				throw 'can not save rate';
			} else {
				console.log('Saved in database', fromExRate, toExRate, rate);
				job.successCount++;
				callback();
				Rate.find({}, function (err2, rate) {
				}).limit(3).sort({$natural: -1});
			}
		});
	})
	.catch(function (e) {
		job.failCount++;
		console.log('logging the error here:', e);
		callback();
	})
	;
};
module.exports = scraper;

