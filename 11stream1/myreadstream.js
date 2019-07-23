const fs = require('fs');
let Readstream = require('./basereadstream');
let rs = new Readstream('./11stream1/1.txt', {
  flag: 'r',
  encoding: 'utf8',
  start: 3,
  end: 7,
  highWaterMark: 3
})
rs.on('open', () => {
  console.log('open');
})
rs.on('data', data => {
  console.log(data);
})
rs.on('end', () => {
  console.log('end');
})
rs.on('close', () => {
  console.log('close');
})
