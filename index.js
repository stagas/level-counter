
/*!
 *
 * level-counter
 *
 * keep count of the elements in a sublevel
 *
 * MIT
 *
 */

/**
 * Module dependencies.
 */

var inc = require('level-inc');
var slice = [].slice;

/**
 * Patch `db` to keep count of elements.
 *
 * @param {Sub} db
 * @return {Sub}
 * @api public
 */

module.exports = function(db){
  // create a counter sublevel
  var counter = db.sublevel('counter', { valueEncoding: 'utf8' });
  counter.inc = inc(counter);

  // decorate methods
  db.put = decorate(db.put, 1);
  db.del = decorate(db.del, -1);

  // count getter
  db.count = function(fn){
    counter.get('count', function(err, count){
      if (err) return fn(err);
      fn(null, Number(count));
    });
  };

  // method decorator
  function decorate(method, n){
    return function(){
      var args = slice.call(arguments);
      var fn = args[args.length - 1];
      counter.inc('count', n, function(err){
        if (err) return fn(err);
        method.apply(db, args);
      });
    };
  }

  return db;
};
