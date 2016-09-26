'use strict';
const cheerio = require('cheerio');
const rp = require('request-promise');
const Rate = require('./db.js');

const scraper = function (fromExRate, toExRate) {
	const options = {
		uri: 'http://www.xe.com',
		transform: function (body) {
			return cheerio.load(body);
		}
	};

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
			if (err) {
				console.log(err);
			} else {
				console.log('Saved in database');
				Rate.find({}, function (err2, rate) {
					console.log('all rates', rate);
				}).limit(3).sort({$natural: -1});
			}
		});
	});
};
module.exports = scraper;

