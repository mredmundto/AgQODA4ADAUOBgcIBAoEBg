var co = require('co');

co(function *(){
  var result = yield Promise.resolve(true);
}).catch(onerror);

co(function *(){
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log('this is res',res);
}).catch(onerror);

// errors can be try/catched
co(function *(){
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.error(err.message); // "boom"
 }
}).catch(onerror);

function onerror(err) {
  console.error(err.stack);
}

co(function* () {
  return yield Promise.resolve('123');
}).then(function (val) {
  return val + '4';
}).then(function(finalVal){
  return finalVal
}).then(function(log){
  console.log(log)
})