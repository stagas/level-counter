
# level-counter

keep count of the elements in a sublevel

## Installing

`npm install level-counter`

## Example

```js
var level = require('level');
var sublevel = require('sublevel');
var counter = require('level-counter');

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
```

## API

### counter(db)

Patch `db` to keep count of elements.

### count(fn)

Callbacks the number of elements.

## License

MIT
