let fs = require('fs')
/**
 * 是一个类
 * 三个状态  等待 成功 失败  最终状态不可以变
 *
 */

//  resolve 成功
//  reject  失败
// 每个promise实例都有then方法
// new Promise的时候报错 只能失败 抛错也是失败
let Promise = require('./Promise')
let promise = new Promise((resolve, reject) => {
  // executor 执行器
  // 立即执行
  console.log(1);
  // throw new Error('fail')
  setTimeout(() => {

    resolve('hello')
  }, 1000);
})
// 可以调用多次
promise.then((data) => {
  // 成功
  console.log('data', data);

}, (err) => {
  console.log('err', err);
});
promise.then((data) => {
  // 成功
  console.log('data', data);

}, (err) => {
  console.log('err', err);
});

console.log(2);
// ---------------------------------
// then 用法
// let promise=new Promise((resolve, reject)=>{

// })
