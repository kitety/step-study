// Promise all 全部 可以实现等待所有的异步执行完后拿到统一的结果
// 解决异步并发 同步处理结果
const fs = require('fs')
let Promise1 = require('./Promise')


// 返回promise
function read (url) {
  let dfd = Promise1.defer()
  fs.readFile(url, 'utf8', function (err, data) {
    if (err) dfd.reject(err)
    dfd.resolve(data)
  })
  return dfd.promise
}
// 静态方法 static
// 返回promise实例

const isPromise = value => {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    if (typeof value.then === 'function') {
      return true
    }
  }
  return false
}
// 全部成功
Promise1.all = function (values) {
  return new Promise1((resolve, reject) => {

    let arr = []
    let index = 0// 解决多个异步  的并发问题
    // 或者index变量++
    function processData (key, value) {
      arr[key] = value
      // if (arr.filter(Boolean).length === values.length) {
      //   resolve(arr)
      // }
      if (++index === values.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < values.length; i++) {
      const current = values[i];
      // 普通值直接return 不是的话就then
      if (isPromise(current)) {
        current.then(data => {
          // arr[i] = (data)
          processData(i, data)
        }, reject)
      } else {
        // arr[i] = (current)
        processData(i, current)

      }

    }
  })
}
// 全部成功才成功
Promise1.all([1, 2, 3, read('./name.txt'), 5, 6, 7]).then(d => console.log(d))