var mongoose = require('mongoose');
mongoose.connect('localhost');
// define database schema 
var Rate = mongoose.model('Rate', { 
	from: String, 
	to: String, 
	created_at: Date, 
	rate: String,  
});

module.exports = Rate; 