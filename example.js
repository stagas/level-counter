
/**
 * Example.
 */

var level = require('level');
var sublevel = require('sublevel');
var counter = require('./');

var db = counter(sublevel(level('./level-test')));

var total = count = 500;

for (var i = total; i--;) {
  db.put(i, i, function(err){
    --count || check();
  });
}

function check(){
  db.count(function(err, count){
    console.log(count); // => 500
  });
}
