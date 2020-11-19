// 回调函数属于高阶函数的一种
// 高阶函数 参数是函数 或者 返回是函数
// 闭包 函数可以不在当前作用域下执行
// 作用域产生：根据函数定义的位置
// 执行的时候：执行上下文

// AOP 面向切片编程

function say () {
  console.log(arguments)
  console.log('说话');
}

// say是Function的实例
Function.prototype.before = function (beforeFun) {
  // 剩余运算符 在最后有用
  return (...args) => {
    beforeFun()
    // 箭头函数直接绑定 箭头函数没有arguments 原型，向上查找
    // 展开运算符
    this(...args)
  }

  // 谁调用before this就是谁
  // this=say
  // let that = this
  // return function () {
  //   beforeFun()
  //   that()
  // }
}

// 执行之后是个函数
let newFn = say.before(function () {
  console.log('说话前');
})
newFn(1, 2, 3)//看调用函数之前的上下文 window

// vue2.0 aop
// call 用法 执行 指向
let oldPush = Array.prototype.push
function push (...args) {
  console.log('数据更新了');
  oldPush.call(this, ...args)
}
let a = [1, 2, 3]
push.call(a, 4, 4, 4, 4,)
console.log(a);
