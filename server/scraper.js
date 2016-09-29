var request = require('request'); 
var cheerio = require('cheerio'); 
var rp = require('request-promise');
var Rate = require('./db.js'); 

var scraper = function(fromExRate, toExRate){
	var options = {
	    uri: 'http://www.xe.com',
	    transform: function (body) {
	        return cheerio.load(body);
	    }
	};

	rp(options)
  .then(function ($) {
  	 	// scraping the website
  		var map = {}; 
      $('.rateCell').map(function(){
      	var pair = $(this).children().attr('rel').replace(/,|[0-9]/g, ""); 
      	var rate = $(this).text().replace(/\t+/g, "")
      	map[pair] = rate; 
      })
      return map[fromExRate + toExRate]; 
  })
  .then(function(rateInString){
  	// save in database
  	var rateInNumber = Number(rateInString).toFixed(2); 
		var obj = new Rate ({
			"from": fromExRate, 
			"to": toExRate, 
			"created_at": new Date(), 
			"rate": rateInNumber, 
		})
		obj.save(function (err) {
		  if (err) {
		    console.log(err);
		  } else {
		    
		    console.log('Saved in database')
		    // checking to see if can get out 
		    Rate.find({}, function(err, rate){
		    	console.log('all rates', rate); 
		    }).limit(3).sort({$natural:-1});
		  }
		});

  })
  	
}
module.exports = scraper; 
