// 在之后

// 闭包
// 此法作用域 定义的时候就定义好了
// js执行过程 ao 执行对象
function after (times, cb) {
  return function () {
    if (--times === 0) {
      cb()
    }
  }
}
var f = after(3, function () {
  console.log('real');
})
f()
f()
f()
