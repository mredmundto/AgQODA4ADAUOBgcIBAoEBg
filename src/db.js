'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('localhost');
mongoose.connect('mongodb://mredmundto:Yatlun85@ds041586.mlab.com:41586/aftership-mredmundto');
// define database schema
let Rate = mongoose.model('Rate', {
	from: String,
	to: String,
	created_at: Date,
	rate: String
});

module.exports = Rate;
