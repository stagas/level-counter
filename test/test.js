
/**
 * Test.
 */

var assert = require('assert');

var level = require('level');
var sublevel = require('sublevel');
var counter = require('../');

var dbpath = __dirname + '/level-test';
var top;
var db;

beforeEach(function(done){
  top = level(dbpath, done);
  db = sublevel(top);
})

afterEach(function(done){
  top.close(function(){
    level.destroy(dbpath, done);
  });
})

describe("counter(db)", function(){

  it("should patch db", function(){
    counter(db);
    db.should.have.property('count');
  })

})

describe("when putting elements", function(){

  it("should keep track of the number of elements", function(done){
    counter(db);

    var total = count = 500;

    for (var i = total; i--;) {
      db.put(i, i, function(err){
        --count || check();
      });
    }

    function check(){
      db.count(function(err, count){
        assert(null == err);
        count.should.be.a.Number;
        count.should.equal(total);
        done();
      });
    }
  })

})

describe("when putting and deleting elements", function(){

  it("should keep track of the number of elements", function(done){
    counter(db);

    var total = count = 500;

    for (var i = total; i--;) {
      (function(i){
        db.put(i, i, function(err){
          db.del(i, function(err){
            --count || check();
          });
        });
      }(i));
    }

    function check(){
      db.count(function(err, count){
        assert(null == err);
        count.should.be.a.Number;
        count.should.equal(0);
        done();
      });
    }
  })

})
