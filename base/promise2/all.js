let fs = require('fs')

const obj = {}

// function out () {
//   if (Object.keys(obj).length === 2) {
//     console.log(obj);
//   }
// }

function after (times, cb) {
  const obj = {}
  return function (key, value) {
    obj[key] = value
    if (--times === 0) {
      cb(obj)
    }
  }
}

let out = after(2, function (c) {
  console.log(c);
})
// 同时两个异步
fs.readFile('./name.txt', 'utf8', function (err, data) {
  // console.log(data);
  // obj.name = data
  out('name', data)
})
fs.readFile('./age.txt', 'utf8', function (err, data) {
  // console.log(data);
  // obj.age = data

  out('age', data)
})

// 1.回调函数
// 发布订阅模式 发布和订阅
