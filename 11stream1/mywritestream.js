const fs = require('fs');
let WriteStream = require('./basewritestream')
let ws = new WriteStream('./11stream1/1.txt', {
  flags: 'w',
  encoding: 'utf8',
  highWaterMark: 3
})
let i = 10;
function write () {
  let flag = true;
  while (i && flag) {
    flag = ws.write('*', 'utf8', (function (i) {
      return function () {
        console.log(i);
      }
    })(i));
    i--;
    console.log(flag,i);
  }
}
write();
ws.on('drain', () => {
  console.log('drain');
  write()
})
