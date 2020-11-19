let fs = require('fs')

let event = {
  _arr: [],
  // 发布和订阅质检没有任何的关系
  on (fn) {
    this._arr.push(fn)
  },
  emit () {
    this._arr.forEach(item => item())
  },
}

// 自己触发

const obj = {}
event.on(function () {
  console.log('打印');
})
event.on(function () {
  if (Object.keys(obj).length === 2) {
    console.log(obj);
  }
})
fs.readFile('./name.txt', 'utf8', function (err, data) {
  obj['name'] = data
  event.emit()//触发
})
fs.readFile('./age.txt', 'utf8', function (err, data) {
  obj['age'] = data
  event.emit() // 触发
})

// 1.回调函数
// 2.发布订阅模式 发布emit和订阅on 两者没关系
// 观察者模式 需要观察 被观察  有关系的  基于发布订阅的
