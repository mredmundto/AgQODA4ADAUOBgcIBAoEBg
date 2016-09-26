'use strict';
const promise = require('bluebird');
const request = promise.promisify(require('request'));
promise.promisifyAll(request);

request('http://www.xe.com')
.then((html) => {
	console.log(html.body);
});
