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
  *[Symbol.iterator]() {
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
console.log([...obj]);  //生成器的应用 生成迭代器
