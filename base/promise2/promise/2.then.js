/**
 * 1.then中传递的函数，判断成功和失败函数的返回的结果
 * 2.判断是不是promise 如果是promise就采用其状态
 * 3.不是promise 直接将结果传递下去
 */

let Promise1 = require('./Promise')
// let p = new Promise1((resolve, reject) => {
//   resolve()
// })
// p.then(data => {
//   return 100
// }).then(d => console.log(d))


// // q2的错误使用 x和promise2不能同一个
// let q = new Promise1((resolve, reject) => {
//   resolve()
// })
// // 自己等待自己
// let q2 = q.then(() => {
//   return new Promise1((resolve, reject) => {
//     setTimeout(() => {
//       resolve(new Promise1((resolve, reject) => {
//         setTimeout(() => {
//           resolve(1000)
//         }, 1);
//       }))
//     }, 1);
//   })
// })
// q2.then((d) => {
//   console.log(d);
// }, (err) => console.log(err)).then((d) => {
//   console.log(d);
// }, (err) => console.log(err))

// 可选参数
let c = new Promise((resolve, reject) => {
  resolve(123)
})
// c.then(d => d).then(d => d).then(data => {
//   console.log(data);
// })
c.then().then().then(data => {
  console.log(data);
})