'use strict';
const cheerio = require('cheerio');
const rp = require('request-promise');
const Rate = require('./db.js');

const scraper = function (job, callback) {
	const options = {
		uri: 'http://www.xe.com',
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	const fromExRate = job.payload.from;
	const toExRate = job.payload.to;

	rp(options)
	.then(function ($) {
	// scraping the website
		let map = {};
		$('.rateCell').map(function () {
			let pair = $(this).children().attr('rel').replace(/,|[0-9]/g, '');
			let rate = $(this).text().replace(/\t+/g, '');
			map[pair] = rate;
		});
		return map[fromExRate + toExRate];
	})
	.then(function (rateInString) {
  // save in database
		let rateInNumber = Number(rateInString).toFixed(2);
		let obj = new Rate({
			'from': fromExRate,
			'to': toExRate,
			'created_at': new Date(),
			'rate': rateInNumber
		});
		obj.save(function (err) {
			if (err) { console.log(err); } else {
				console.log('Saved in database', fromExRate, toExRate, rateInNumber);
				job.successCount++;
				callback('success');

				Rate.find({}, function (err2, rate) {
				//console.log('all rates', rate);
				}).limit(3).sort({$natural: -1});

			}
		});
	});
};
module.exports = scraper;

