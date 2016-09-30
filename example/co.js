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


var co = require('co');

publishLevel(12, {data: true}).then(function(level_data) {
  console.log(level_data);
});

function publishLevel(user_id, level_data) {
  return co(function * publishLevel() {
    var user = yield getUser(user_id);
    var can_create = yield canCreate(user);

    if (!can_create) {
      return null;
    }

    var level = yield saveLevel(user, level_data);

    return level;
  });
}

// function getUser(user_id) {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve({
//         id: user_id,
//         nickname: 'tlhunter'
//       });
//     }, 100);
//   });
// }

// function canCreate(user) {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve(user.id === 12);
//     }, 100);
//   });
// }

// function saveLevel(user, data) {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve({
//         id: 100,
//         owner: user.nickname,
//         data: data
//       });
//     }, 100);
//   });
// }

// function* myGenerator() {  
//   yield 'first';
//   let input = yield 'second';
//   yield input;
// }

// // Getting the generator object
// let gen = myGenerator();

// // Launching the generator
// console.log(gen.next()); // { value: 'first', done: false }

// // First resume (no passed value)
// console.log(gen.next()); // { value: 'second', done: false }

// // First resume (pass a value)
// console.log(gen.next('third')); // { value: 'third', done: false }


// function* myGenerator() {  
//   yield 'first';
//   yield 'second';
//   yield 'third';
// }

// console.log(myGenerator); 

// for (var v of myGenerator()) {  
//   console.log(v);
// }

