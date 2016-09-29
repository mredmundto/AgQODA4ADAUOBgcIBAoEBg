'use strict';
const mongoose = require('mongoose');
mongoose.connect('localhost');
// define database schema
let Rate = mongoose.model('Rate', {
	from: String,
	to: String,
	created_at: Date,
	rate: String
});

module.exports = Rate;
