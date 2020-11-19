
// then的用法
let fs = require('fs')
let path = require('path')

// 1.name.txt 2.age.txt

// 毁掉嵌套 异步处理问题
// fs.readFile('./name.txt', 'utf8', function (err, data) {
//   console.log(data);
//   fs.readFile(data, 'utf8', function (err, data) {
//     console.log(data);
//   })
// })


// 变为promise
function read (url, code = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(url, code, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
// 如果一个promise的then方法中的函数返回是一个promise的话，会自动执行。并且采用它的状态。成功回想外层的下一个then传递
// 默认undefined 也可以promise
read('./name.txt').then((result) => {
  return read(result + 3)
}, (err) => {
  console.log(err)
}).then(d => console.log(d), e => {
  console.log(e)
  // 返回是一个普通值 会走下一个resolve  throw 走catch
  // 如果想终止promise  可以返回一个pending的promise
  // throw 33
  return new Promise((resolve, reject) => {})
}).then(d => {
  console.log(1111,d)
}, e => {
  console.log(1111, e)
  // 返回是一个普通值 会走下一个resolve
  return 33
})
//  then 两种情况会失败 返回失败的promise或者抛出错误
// 每次then都返回新的 promise实例

// 可以加catch 但是找最近的