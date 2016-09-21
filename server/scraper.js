var request = require('request'); 
var cheerio = require('cheerio'); 

var scraper = function(){
	url = 'http://www.xe.com';
	request(url, function(error, response, html){
		var arr = []; 
		var $ = cheerio.load(html); 
		$('.rateCell').map(function(){
			var pair = $(this).children().attr('rel').replace(/,|[0-9]/g, ""); 
			var rate = $(this).text().replace(/\t+/g, "")
			arr.push([pair,rate]); 
		})
		console.log(arr)
	})

}
module.exports = scraper; 
