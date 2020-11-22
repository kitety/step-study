// generator es6规范  和promise配合

// 这就是一个generator函数 特点可以暂停
// * yield 产出
// iterator 迭代器
// 生成器返回的是迭代器
// for of 必须要有迭代器接口 iterator

// function* read() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// let it = read();

// console.log(it.next()); //{ value: 1, done: false }
// console.log(it.next()); //{ value: 2, done: false }
// console.log(it.next()); //{ value: 3, done: false }
// console.log(it.next()); //{ value: undefined, done: true }

// Array.from [...arr]  类数组转换为数组
/**
 * array.from 变为数组
 * ...具有迭代的功能  元素必须可迭代
 */

let obj = {
  0: 1,
  1: 2,
  length: 2,
  //  可迭代的方法  对象 有个next方法  每次调用 返回 value done 属性
  *[Symbol.iterator] () {
    // 用生成器生成迭代器

    for (let index = 0; index < this.length; index++) {
      yield this[index];
    }

    // let index = 0;
    // return {
    //   next: () => {
    //     return { value: this[index], done: this.length === index++ };
    //   },
    // };
  }, //元编程
};
// console.log(Array.from(obj));
// console.log([...obj]);  //生成器的应用 生成迭代器

// function* read () {
//   let a = yield 'hello'
//   console.log(a);
//   let b = yield 'cccc'
//   console.log(b);
// }
// // 碰到yield就停止
// let c = read()
// // console.log(c.next(/** 传给a */)); //yield 'hello'
// // console.log(c.next(/** 传给b */)); // 打印 undefined yield 'cccc'
// // console.log(c.next()); // 打印 undefined  // 全部流程结束

// // 传给上次yield的返回值
// console.log(c.next()); // 第一次的传参是没有意义的
// console.log(c.next(1)); // 打印 undefined yield 'cccc'
// console.log(c.next(2)); // 打印 undefined  // 全部流程结束


let fs = require('fs').promises//可以直接将fs中的方法变为promise node10+
function* read () {
  try {
    
    let content = yield fs.readFile('./name.txt', 'utf8')
    let r = yield fs.readFile(content, 'utf8')
    return r
  } catch (error) {
    console.log(error);
  }
}

// // 循环不支持异步  ==  递归
// let it = read()
// let { value, done } = it.next()
// // 变为promise
// Promise.resolve(value).then((data) => {
//   let { value, done } = it.next(data)
//   Promise.resolve(value).then((data) => {
//     console.log(data);
//   })
// })

// 将迭代器的结果执行完
function co (it) {
  return new Promise((resolve, reject) => {
    // 递归
    function next (data) {
      let { value, done } = it.next(data)
      // value是个promise
      if (!done) {
        Promise.resolve(value).then(d => {
          next(d)
        }, reject)
      } else {
        resolve(data)
      }
    }
    next()
  })
}

co(read()).then(d => { console.log(d); }, console.log)